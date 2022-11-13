import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
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
