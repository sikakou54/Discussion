import { useState } from "react";

export default function Select({ title, detail, onJoin, onCancel, message }) {

    const [type, setType] = useState(0);

    function onJoinClick() {
        if (0 !== type) {
            onJoin(type);
        }
    }

    function onCancelClick() {
        onCancel();
    }

    return (
        <div>
            <h1>{title}</h1>
            <p>{detail}</p>
            <div>
                <input onClick={() => { setType(1) }} type="button" value={"肯定"} />
                <input onClick={() => { setType(2) }} type="button" value={"否定"} />
                <input onClick={() => { setType(3) }} type="button" value={"視聴"} />
                <input type="button" onClick={onJoinClick} value={"参加する"} />
                <input type="button" onClick={onCancelClick} value={"キャンセル"} />
            </div>
            <div>{message}</div>
        </div>
    );
}

//SSR
export async function getServerSideProps({ query }) {

    let post = {};
    //console.log(query);

    // データフェッチ
    const res = await fetch(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussion/" + query.postId, { method: "GET" });
    console.log(res);
    if (200 === res.status) {
        post = await res.json();
    }
    console.log(post);

    // Postsに渡す
    return { props: { post } };
}