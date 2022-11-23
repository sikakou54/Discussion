import Router, { useRouter } from 'next/router';

export default function Result() {

    const router = useRouter();
    const { win, positive, negative } = router.query;

    function click() {
        Router.push({
            pathname: 'posts'
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