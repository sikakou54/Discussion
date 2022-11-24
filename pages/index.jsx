import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { parseCookies } from 'nookies';
import Header from '../components/Header';

export default function Home() {

  return (
    <div className={styles.container}>

      <Header userId={undefined} />
      <Head>
        <title>Discussion</title>
      </Head>

      <main className={styles.main}>
        <h1>HOME画面</h1>
        <Link href={'/signIn'}>ログインはこちら</Link>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

//SSR
export async function getServerSideProps(ctx) {

  const cookie = parseCookies(ctx);

  if (-1 !== Object.keys(cookie).indexOf('jwt')) {

    return {
      redirect: {
        destination: '/posts',
        permanent: false
      }
    }

  } else {

    return {
      props: {}
    };

  }

}