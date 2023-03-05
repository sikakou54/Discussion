import styles from '../styles/Home.module.css';
import Router from 'next/router';
import Image from 'next/image';
import bgimage from '../public/bgimage.png';
import Footer from '../components/footer';
import { useState } from 'react';
import { apiFetchGet, apiFetchPost } from '../api/utils';
import timeline from '../public/home/timeline2@2x.png';
import timelineNone from '../public/home/timeline1@2x.png';
import select from '../public/home/select@2x.png';
import join from '../public/home/join@2x.png';
import standby from '../public/home/standby@2x.png';
import ready from '../public/home/ready2@2x.png';
import discussion from '../public/home/discussion@2x.png';
import finish from '../public/home/finish@2x.png';
import vate from '../public/home/vote2@2x.png';
import voteFinish from '../public/home/votefinish.png';
import result from '../public/home/result@2x.png';
import post1 from '../public/home/post1@2x.png';
import post2 from '../public/home/post2@2x.png';
import post3 from '../public/home/post3@2x.png';
import post4 from '../public/home/post4@2x.png';

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
          <div className={styles.aboutText}>
            <div className={styles.about}>TalkUpは匿名の討論アプリです</div>
            <div className={styles.about}>TalkUpであなたのTalk力を試してみませんか？</div>
          </div>
        </div>
        <div className={styles.startSecssion}>
          <form onSubmit={onClick} className={styles.form}>
            <input className={styles.name} type='text' placeholder='名前' maxLength={15} required onChange={(e) => { setName(e.target.value) }} />
            <input type='submit' className={styles.startButton} value='はじめる' />
          </form>
        </div>
      </div>
      <div className={styles.bar}>ROOMに参加する</div>
      <div className={styles.section}>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>1.気になるROOMを選びます</u></div>
          <div className={styles.screenImange}>
            <Image src={timeline} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>2.選択して「参加する」をクリック！</u></div>
          <div className={styles.screenImange}>
            <Image src={select} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>3.ROOMに問い合わせを行います</u></div>
          <div className={styles.screenImange}>
            <Image src={join} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>4.参加条件を満たすまで待機します</u></div>
          <div className={styles.screenImange}>
            <Image src={standby} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>5.参加者が集まったら準備が始まります</u></div>
          <div className={styles.screenImange}>
            <Image src={ready} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>6.討論が開始します(10分)</u></div>
          <div className={styles.screenImange}>
            <Image src={discussion} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>7.討論終了</u></div>
          <div className={styles.screenImange}>
            <Image src={finish} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>8.投票タイム(30秒)</u></div>
          <div className={styles.screenImange}>
            <Image src={vate} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>9.投票終了</u></div>
          <div className={styles.screenImange}>
            <Image src={voteFinish} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>10.結果発表</u></div>
          <div className={styles.screenImange}>
            <Image src={result} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>12.討論が終わったらROOMは無くなります</u></div>
          <div className={styles.screenImange}>
            <Image src={timelineNone} />
          </div>
        </div>
      </div>
      <div className={styles.bar}>ROOMを作る</div>
      <div className={styles.section}>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>1. 空いているROOMを選びます</u></div>
          <div className={styles.screenImange}>
            <Image src={timelineNone} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>2. 議題を入力します</u></div>
          <div className={styles.screenImange}>
            <Image src={post1} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>3. 討論を入力します</u></div>
          <div className={styles.screenImange}>
            <Image src={post2} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>4. 概要を入力します</u></div>
          <div className={styles.screenImange}>
            <Image src={post3} />
          </div>
        </div>
        <div className={styles.secssionItem}>
          <div className={styles.secssionText}><u>5. 内容を確認し「完了」をクリック！</u></div>
          <div className={styles.screenImange}>
            <Image src={post4} />
          </div>
        </div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div>
  );
}