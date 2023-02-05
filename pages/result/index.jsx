import Router, { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { jwtVerify } from '../../api/auth';
import Layout from '../../components/layout';
import styles from '../../styles/Result.module.css';

export default function Result({ userId }) {

    const router = useRouter();
    const { win, positive, negative } = router.query;

    return (
        <Layout userId={userId} title={'Result'}>
            <div className={styles.container}>
                <div>win:{win}</div>
                <div>positive:{positive}</div>
                <div>negative:{negative}</div>
                <button onClick={() => Router.push('/posts')}>posts</button>
            </div>
        </Layout>
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
