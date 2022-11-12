import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Result() {

    const router = useRouter();
    const { userId, win, positive, negative } = router.query;

    function click() {
        Router.push({
            pathname: 'posts',
            query: {
                userId: userId
            }
        });
    }

    return (
        <div>
            <div>result</div>
            <div>win:{win}</div>
            <div>positive:{positive}</div>
            <div>negative:{negative}</div>
            <button onClick={click}>posts</button>
        </div>
    );
}