import styles from '../styles/Home.module.css'
import Layout from '../components/layout';
import Router from 'next/router';
import Image from 'next/image';
import bgimage from '../public/bgimage.png';

export default function Home() {

  return (
    <div className={styles.container}>

      <div className={styles.top}>
        <div className={styles.bgImage}>
          <Image src={bgimage} />
        </div>
      </div>

      <div className={styles.second}>
        <div className={styles.aboutText}>
          <div className={styles.about}>What’s TalkUp？</div>
          <div className={styles.detail}>TalkUpは匿名の討論アプリです</div>
          <div className={styles.detail}>TalkUpであなたのTalk力を測ってみませんか？</div>
        </div>
        <button className={styles.startButton} onClick={() => Router.push('/posts')}>はじめる</button>
      </div>

      <div className={styles.bar}>遊び方</div>

      <div className={styles.section}>
        <div className={styles.label}>
          <div>気になるROOMを選びます</div>
        </div>
        <div className={styles.screenImange}></div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>
          <div>ROOMに参加します</div>
        </div>
        <div className={styles.screenImange}></div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>
          <div>参加者がそろったら討論開始</div>
        </div>
        <div className={styles.screenImange}></div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>
          <div>投票タイム</div>
        </div>
        <div className={styles.screenImange}></div>
      </div>

      <div className={styles.section}>
        <div className={styles.label}>
          <div>結果発表</div>
        </div>
        <div className={styles.screenImange}></div>
      </div>

    </div>
  );
}