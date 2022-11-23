//import Router from 'next/router';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { apiFetchPost } from '../../api/api';

export default function Post() {

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const router = useRouter();
    const userId = router.query.userId;

    async function onPost() {

        await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + "/setDiscussion", {
            body: JSON.stringify({
                country: 'jpn',
                userId: userId,
                title: title,
                detail: detail,
            })
        });

        Router.push({
            pathname: "posts"
        });
    }

    function onCancel() {
        Router.push({
            pathname: "posts"
        });
    }

    return (
        <div>
            <div>タイトル：<input type="text" onChange={(e) => { setTitle(e.target.value) }} /></div>
            <div>詳細<input type="text" onChange={(e) => { setDetail(e.target.value) }} /></div>
            <div>
                <input type="button" onClick={onCancel} value={"キャンセル"} />
                <input type="button" onClick={onPost} value={"投稿する"} />
            </div>
        </div>
    );
}