import styles from '../styles/Home.module.css';
import Router from 'next/router';
import Image from 'next/image';
import bgimage from '../public/bgimage.png';
import Footer from '../components/footer';
import { useState } from 'react';
import { apiFetchGet, apiFetchPost } from '../api/utils';

export default function Home() {

  const [name, setName] = useState('');

  async function onClikc() {

    let response = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getToken')
    if (200 !== response.statusCode) {
      return;
    }

    const userId = response.data;
    response = await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/setUser', {
      userId,
      userName: name
    });
    if (200 === response.statusCode) {
      Router.push({
        pathname: 'posts',
        query: {
          userId
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
          <div className={styles.label}>気になるROOMを選びます</div>
          <div className={styles.screenImange}></div>
        </div>
        <div className={styles.section}>
          <div className={styles.label}>ROOMに参加します</div>
          <div className={styles.screenImange}></div>
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