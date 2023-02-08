import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {

  return (
    <Layout userId={undefined} title={'Home'}>
      <main className={styles.main}>
        <h1>HOME画面</h1>
        <Link href={'/signIn'}>ログインはこちら</Link>
      </main>
    </Layout>
  );
}

//SSR
export async function getServerSideProps() {

  return {
    redirect: {
      destination: '/posts',
      permanent: false
    }
  }

}