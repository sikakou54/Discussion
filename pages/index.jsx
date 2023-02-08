import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { parseCookies } from 'nookies';
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
export async function getServerSideProps(ctx) {

  return {
    redirect: {
      destination: '/posts',
      permanent: false
    }
  }

}