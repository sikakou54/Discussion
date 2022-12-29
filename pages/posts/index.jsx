import Router from 'next/router';
import { parseCookies } from 'nookies';
import { apiFetchGet } from '../../api/utils';
import { jwtVerify } from '../../api/auth';
import Layout from '../../components/layout';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import SideView from '../../components/sideView';
import TimeLineView from '../../components/timeLineView';
import PostButton from '../../components/postButton';

export default function Posts({ posts, userId, config }) {

    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(config.lastEvaluatedKey);
    const [items, setItems] = useState(posts);
    const bodyElement = useRef(null);
    const windowElement = useRef(null);
    const [scrollBottomPosition, setScrollBottomPosition] = useState(undefined);

    function onClick(_postId) {
        Router.push({
            pathname: 'discussion',
            query: {
                postId: _postId
            }
        });
    }

    function scroollEventListener() {
        setScrollBottomPosition(bodyElement.current.offsetHeight - (windowElement.current.scrollY + windowElement.current.innerHeight));
    }

    useEffect(() => {

        bodyElement.current = document.body;
        windowElement.current = window;
        windowElement.current.onscroll = scroollEventListener;

        return () => {
            windowElement.current.onscroll = null;
        }

    }, []);

    useEffect(() => {

        if (undefined !== scrollBottomPosition) {

            //console.log(scrollBottomPosition);

            if (1 >= scrollBottomPosition) {

                //console.log(lastEvaluatedKey);

                if (null !== lastEvaluatedKey) {

                    apiFetchGet('/getDiscussions/' + lastEvaluatedKey.country + '/' + lastEvaluatedKey.createAt + '/' + lastEvaluatedKey.postId, {
                        headers: {
                            Authorization: config.jwt
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

                        } else if (401 === res.statusCode) {
                            Router.push('/signIn');
                        }
                    });
                }
            }
        }

    }, [scrollBottomPosition]);

    return (
        <Layout userId={userId} title={'Posts'} >
            <div className={styles.container}>
                <div className={styles.timeLineView}><TimeLineView items={items} onClick={onClick} /></div>
                <div className={styles.sideView}><SideView userId={userId} /></div>
                <div className={styles.post}><PostButton /></div>
            </div>
        </Layout >
    );
}

//SSR
export async function getServerSideProps(ctx) {

    let lastEvaluatedKey = null;
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
                lastEvaluatedKey = res.data.LastEvaluatedKey;
            }

            return {
                props: {
                    posts: res.data.Items,
                    userId: sub,
                    config: {
                        jwt: cookie.jwt,
                        lastEvaluatedKey
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
