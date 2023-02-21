import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Layout from '../components/layout';
import Router from 'next/router';

export default function Home() {

  return (
    <Layout userId={undefined} title={'Home'}>
      <div className={styles.container}>

        <div className={styles.top}>
          <div className={styles.titleSecssion}  >
            <div className={styles.appNameSction} >匿名討論アプリ</div>
            <div className={styles.appName} >TalkUp</div>
          </div>

          <div className={styles.buttonFrame}>
            <button className={styles.startButton} onClick={() => Router.push('/posts')}>はじめる</button>
          </div>
        </div>

        <div className={styles.bar}>
          <div>遊び方</div>
        </div>

        <div className={styles.section}>
          <div className={styles.label} >
            <div>気になるルームを選択</div>
          </div>
          <div className={styles.screenImange}></div>
        </div>

        <div className={styles.section}>
          <div className={styles.label} >
            <div>ルームに参加</div>
          </div>
          <div className={styles.screenImange}></div>
        </div>

        <div className={styles.section}>
          <div className={styles.label} >
            <div>討論を開始</div>
          </div>
          <div className={styles.screenImange}></div>
        </div>

        <div className={styles.section}>
          <div className={styles.label} >
            <div>投票タイム</div>
          </div>
          <div className={styles.screenImange}></div>
        </div>

        <div className={styles.section}>
          <div className={styles.label} >
            <div>結果発表</div>
          </div>
          <div className={styles.screenImange}></div>
        </div>
      </div>
    </Layout>
  );
}