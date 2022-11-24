import { useState } from 'react';
import Router from 'next/router';
import { apiFetchPost } from '../../api/utils';
import { jwtVerify } from '../../api/auth';
import Header from '../../components/Header';
import { parseCookies } from 'nookies';

export default function Post({ userId }) {

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

    async function onPost() {

        await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + "/setDiscussion", {
            body: JSON.stringify({
                country: 'jpn',
                userId: userId,
                title: title,
                detail: detail,
            })
        });
        Router.push('/posts');
    }

    function onCancel() {
        Router.push('/posts');
    }

    return (
        <div>
            <Header userId={userId} />
            <div>タイトル：<input type="text" onChange={(e) => { setTitle(e.target.value) }} /></div>
            <div>詳細<input type="text" onChange={(e) => { setDetail(e.target.value) }} /></div>
            <div>
                <input type="button" onClick={onCancel} value={"キャンセル"} />
                <input type="button" onClick={onPost} value={"投稿する"} />
            </div>
        </div>
    );
}

//SSR
export async function getServerSideProps(ctx) {

    const cookie = parseCookies(ctx);

    if (-1 !== Object.keys(cookie).indexOf('jwt')) {

        const { sub } = await jwtVerify(cookie.jwt);

        return {
            props: {
                userId: sub
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
