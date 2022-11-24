import Router from 'next/router';
import { parseCookies } from 'nookies';
import { apiFetchGet } from '../../api/utils';
import { jwtVerify } from '../../api/auth';
import Header from '../../components/Header';

export default function Posts({ posts, userId }) {

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

    return (
        <div>
            <Header userId={userId} />
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

        if (res.result) {

            const { sub } = await jwtVerify(cookie.jwt);

            return {
                props: {
                    posts: res.data,
                    userId: sub
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
