import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

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

    useEffect(() => {
        sessionStorage.removeItem('state');
    }, []);

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
export async function getServerSideProps(/*{ params, query }*/) {

    // データフェッチ
    const res = await fetch(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussions", { method: "GET", body: { country: 'jpn' } });
    const posts = await res.json();
    //console.log(posts);

    // Postsに渡す
    return { props: { posts: posts.Items } }
}