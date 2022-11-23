import Router from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import { apiFetchGet } from '../../api/api';

export default function Posts({ posts }) {

    function onClick(postId) {
        Router.push({
            pathname: "discussion",
            query: {
                postId: postId
            }
        });
    }

    function onPostClick() {
        Router.push({
            pathname: "post"
        });
    }

    useEffect(() => { }, []);

    return (
        <div>
            <h1>Posts</h1>
            <div>
                {
                    posts.map((value, index) => {
                        return (
                            <div key={index} onClick={() => { onClick(value.postId) }} style={{ border: 'solid', margin: '20px' }}>
                                <div>{value.postId}</div>
                                <div>{value.title}</div>
                                <div>{value.detail}</div>
                                <div>{value.createAt}</div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={onPostClick}>投稿する</button>
        </div >
    );
}

//SSR
export async function getServerSideProps(ctx) {

    const cookie = parseCookies(ctx);

    if (-1 !== Object.keys(cookie).indexOf('jwt')) {

        const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + 'jpn', {
            headers: {
                Authorization: cookie.jwt
            }
        });

        if (res.status) {

            return {
                props: {
                    posts: res.data
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