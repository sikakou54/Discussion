import styles from '../styles/Home.module.css';
import Router from 'next/router';
import Image from 'next/image';
import bgimage from '../public/bgimage.png';
import Footer from '../components/footer';
import { useState } from 'react';
import { apiFetchGet, apiFetchPost } from '../api/utils';
import timeline from '../public/home/timeline.png';
import select from '../public/home/select.png';

export default function Home() {

  const [name, setName] = useState('');

  async function onClick(e) {

    e.preventDefault();

    let response = await apiFetchGet('/api/getToken');
    if (200 !== response.statusCode) {
      return;
    }
    const { token } = response.data;
    console.log(token);
    response = await apiFetchPost('api/setUser', {
      userId: token,
      userName: name
    });
    if (200 === response.statusCode) {
      Router.push({
        pathname: '/posts',
        query: {
          userId: token,
          country: 'jpn',
          postId: 'none'
        }
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.bgImage}>
          <Image src={bgimage} />
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.detail}>
          <div className={styles.about}>TalkUpは匿名の討論アプリです</div>
          <div className={styles.about}>TalkUpであなたのTalk力を試してみませんか？</div>
        </div>
        <form onSubmit={onClick} className={styles.form}>
          <input className={styles.name} type='text' placeholder='ニックネーム' required onChange={(e) => { setName(e.target.value) }} />
          <input type='submit' className={styles.startButton} value='はじめる' />
        </form>
      </div>
      <div className={styles.third}>
        <div className={styles.bar}>討論に参加する</div>
        <div className={styles.section}>
          <div className={styles.label}>気になるROOMを選びます</div>
          <div className={styles.screenImange}>
            <Image src={timeline} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>ROOMに参加します</div>
          <div className={styles.screenImange}>
            <Image src={select} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>参加者がそろったら討論開始</div>
          <div className={styles.screenImange}></div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>投票タイム</div>
          <div className={styles.screenImange}></div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>結果発表</div>
          <div className={styles.screenImange}></div>
        </div>
      </div>
      <div className={styles.force}>
        <div className={styles.bar}>討論を作る</div>
        <div className={styles.section}>
          <div className={styles.label}>空いているROOMを選択</div>
          <div className={styles.screenImange}></div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>討論内容を登録します</div>
          <div className={styles.screenImange}></div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>ROOMを作成できました</div>
          <div className={styles.screenImange}></div>
        </div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  );
}