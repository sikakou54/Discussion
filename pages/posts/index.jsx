import Router from 'next/router';
import { parseCookies } from 'nookies';
import { apiFetchGet } from '../../api/utils';
import { jwtVerify } from '../../api/auth';
import Layout from '../../components/layout';
import { useEffect, useRef, useState } from 'react';
import { getTimeStampToLocaleString } from '../../api/utils';

import styles from '../../styles/Posts.module.css';

export default function Posts({ posts, userId, next }) {

    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(next.key);
    const [items, setItems] = useState(posts);
    const bodyElement = useRef(null);
    const windowElement = useRef(null);
    const [scrollBottomPosition, setScrollBottomPosition] = useState(undefined);

    function onClick(_postId) {
        Router.push({
            pathname: "discussion",
            query: {
                postId: _postId
            }
        });
    }

    function onPostClick() {
        Router.push('/post');
    }

    function scroollEventListener() {
        setScrollBottomPosition(bodyElement.current.offsetHeight - (windowElement.current.scrollY + windowElement.current.innerHeight));
    }

    useEffect(() => {

        if (undefined !== scrollBottomPosition) {

            //console.log(scrollBottomPosition);

            if (1 >= scrollBottomPosition) {

                //console.log(lastEvaluatedKey);

                if (null !== lastEvaluatedKey) {

                    apiFetchGet('/getDiscussions/' + lastEvaluatedKey.country + '/' + lastEvaluatedKey.createAt + '/' + lastEvaluatedKey.postId, {
                        headers: {
                            Authorization: next.jwt
                        }
                    }).then((res) => {

                        //console.log(res);

                        if (res.result) {

                            let newItems = [];

                            for (let i = 0; i < res.data.Items.length; i++) {

                                if (undefined === items.find((v) => v.postId === res.data.Items[i].postId)) {
                                    //console.log('add', res.data.Items[i]);
                                    newItems.push(res.data.Items[i]);
                                }
                            }

                            if (-1 !== Object.keys(res.data).indexOf('LastEvaluatedKey')) {
                                if (res.data.LastEvaluatedKey.country !== lastEvaluatedKey.country ||
                                    res.data.LastEvaluatedKey.createAt !== lastEvaluatedKey.createAt ||
                                    res.data.LastEvaluatedKey.postId !== lastEvaluatedKey.postId) {
                                    setLastEvaluatedKey(res.data.LastEvaluatedKey);
                                }
                            }

                            setItems((items) => [...items, ...newItems]);
                        }
                    });
                }
            }

        }

    }, [scrollBottomPosition]);

    useEffect(() => {

        bodyElement.current = document.body;
        windowElement.current = window;
        windowElement.current.onscroll = scroollEventListener;

        return () => {
            windowElement.current.onscroll = null;
        }

    }, []);

    return (
        <Layout userId={userId} title={'Posts'} >
            <div className={styles.container}>
                <h1>Posts</h1>
                <div id='items'>
                    {
                        items.map((value, index) => {
                            return (
                                <div key={index} onClick={() => { onClick(value.postId) }} style={{ border: 'solid', margin: '20px' }}>
                                    <div>{value.postId}</div>
                                    <div>{value.title}</div>
                                    <div>{value.detail}</div>
                                    <div>{getTimeStampToLocaleString(value.createAt)}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={onPostClick}>投稿する</button>
            </div>
        </Layout >
    );
}

//SSR
export async function getServerSideProps(ctx) {

    let latestKey = null;
    const cookie = parseCookies(ctx);

    if (-1 !== Object.keys(cookie).indexOf('jwt')) {

        const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + 'jpn' + '/none/none', {
            headers: {
                Authorization: cookie.jwt
            }
        });
        //console.log(res);

        if (res.result) {

            const { sub } = await jwtVerify(cookie.jwt);

            if (-1 !== Object.keys(res.data).indexOf('LastEvaluatedKey')) {
                latestKey = res.data.LastEvaluatedKey;
            }

            return {
                props: {
                    posts: res.data.Items,
                    userId: sub,
                    next: {
                        jwt: cookie.jwt,
                        key: latestKey
                    }
                }
            }

        } else if (401 === res.statusCode) {

            return {
                redirect: {
                    destination: '/signIn',
                    permanent: false
                }
            }

        } else {

            return {
                props: {
                    posts: []
                }
            }
        }

    } else {

        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }
}
