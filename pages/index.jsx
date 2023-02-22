import styles from '../styles/Home.module.css';
import Router from 'next/router';
import Image from 'next/image';
import bgimage from '../public/bgimage.png';
import Footer from '../components/footer';
import { useState } from 'react';

export default function Home() {

  const [name, setName] = useState('');

  function onClikc() {
    console.log(name);
    Router.push('/posts');
  }

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
          <div className={styles.detail}>
            <p>TalkUpは匿名の討論アプリです</p>
            <p>TalkUpであなたのTalk力を試してみませんか？</p>
          </div>
        </div>
        <div className={styles.form}>
          <input className={styles.name} type='text' placeholder='ニックネーム' required onChange={(e) => { setName(e.target.value) }} />
          <button className={styles.startButton} onClick={onClikc}>はじめる</button>
        </div>
      </div>
      <div className={styles.third}>
        <div className={styles.bar}>討論に参加する</div>
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
        <div className={styles.bar}>討論を作る</div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  );
}