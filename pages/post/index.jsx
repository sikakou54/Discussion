//import Router from 'next/router';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';

export default function Post() {

    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const router = useRouter();
    const userId = router.query.userId;

    function onPost() {
        console.log(title, detail);
        fetch(process.env.awsApiGatewayHttpApiEndPoint + "/setDiscussion", {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
                title: title,
                detail: detail,
            })
        }).then((res) => res.json())
            .then((data) => {

                console.log(data);

                Router.push({
                    pathname: "posts",
                    query: {
                        userId: userId
                    }
                });

            }).catch((e) => {
                console.log(e);
            });
    }

    function onCancel() {
        Router.push({
            pathname: "posts",
            query: {
                userId: userId
            }
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