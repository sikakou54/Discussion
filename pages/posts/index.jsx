import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import { jwtVerify } from '../../api/auth';
import { apiFetchGet } from '../../api/api';

export default function Posts({ posts }) {

    const router = useRouter();
    const userId = router.query.userId;

    function onClick(postId) {
        Router.push({
            pathname: "discussion",
            query: {
                postId: postId,
                userId: userId
            }
        });
    }

    function onPostClick() {
        Router.push({
            pathname: "post",
            query: {
                userId: userId
            }
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

        // データフェッチ
        const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + 'jpn', {
            method: 'GET',
            headers: {
                Authorization: cookie.jwt
            }
        });

        if (res.status) {

            const posts = res.data;

            return {
                props: {
                    posts
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
                redirect: {
                    destination: '/',
                    permanent: false
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