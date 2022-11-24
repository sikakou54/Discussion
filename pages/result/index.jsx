import Router, { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { jwtVerify } from '../../api/auth';
import Header from '../../components/Header';

export default function Result({ userId }) {

    const router = useRouter();
    const { win, positive, negative } = router.query;

    function click() {
        Router.push('/posts');
    }

    return (
        <div>
            <Header userId={userId} />
            <div>result</div>
            <div>win:{win}</div>
            <div>positive:{positive}</div>
            <div>negative:{negative}</div>
            <button onClick={click}>posts</button>
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
