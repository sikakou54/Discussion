import styles from '../styles/Home.module.css';
import Router from 'next/router';
import Image from 'next/image';
import bgimage from '../public/bgimage.png';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import timeline from '../public/home/timeline1@2x.png';
import timelineNone from '../public/home/timeline2@2x.png';
import select from '../public/home/select@2x.png';
import standby from '../public/home/standby@2x.png';
import ready from '../public/home/ready@2x.png';
import discussion from '../public/home/discussion@2x.png';
import finish from '../public/home/finish@2x.png';
import vate from '../public/home/vote@2x.png';
import voteFinish from '../public/home/votedone@2x.png';
import result from '../public/home/result@2x.png';
import post1 from '../public/home/post1@2x.png';
import post2 from '../public/home/post2@2x.png';
import post3 from '../public/home/post3@2x.png';
import post4 from '../public/home/post4@2x.png';
import talkIcon1 from '../public/home/talkIcon1.png';
import talkIcon2 from '../public/home/talkIcon2.png';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css';

export default function Home() {

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('none');

  function onClick(e) {
    e.preventDefault();
    fetch('/api/getToken', { method: 'GET' }).then(response => response.json()).then((data) => {
      setUserId(data.token);
    });
  }

  useEffect(() => {
    sessionStorage.setItem('talkUp', JSON.stringify({}));
  }, []);

  useEffect(() => {

    if ('none' !== userId) {
      fetch('/api/setUser', {
        method: 'POST', body: JSON.stringify({
          userId,
          userName: name
        })
      }).then(response => response.json()).then((data) => {
        if (data.response.result) {
          sessionStorage.setItem('talkUp', JSON.stringify({
            userId
          }));
          Router.push({
            pathname: '/posts'
          });
        }
      });
    }

  }, [userId]);

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
            <div className={styles.about}>TalkUpで理論的トーク力を育みませんか？</div>
          </div>
        </div>
        <div className={styles.startSecssion}>
          <form onSubmit={onClick} className={styles.form}>
            <input className={styles.name} type='text' placeholder='名前' maxLength={15} required onChange={(e) => { setName(e.target.value) }} />
            <input type='submit' className={styles.startButton} value='はじめる' />
          </form>
        </div>
      </div>
      <div className={styles.SplideSession}>
        <div className={`${styles.SplideItems} ${styles.reverse}`}>
          <div className={styles.nav}>
            <div className={styles.navText}>討論する</div>
          </div>
          <div className={styles.Splide}>
            <Splide
              aria-label="遊び方"
              options={{
                autoplay: false // 自動再生を無効
              }}>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>ROOMを選びます</div>
                  <div className={styles.screenImange}>
                    <Image src={timeline} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>項目を選択して「参加する」をクリック！</div>
                  <div className={styles.screenImange}>
                    <Image src={select} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>参加者が揃うまで待機します</div>
                  <div className={styles.screenImange}>
                    <Image src={standby} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>参加者が揃ったら接続が始まります</div>
                  <div className={styles.screenImange}>
                    <Image src={ready} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>討論スタート！(12分)</div>
                  <div className={styles.screenImange}>
                    <Image src={discussion} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>討論終了</div>
                  <div className={styles.screenImange}>
                    <Image src={finish} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>投票タイム(1分)</div>
                  <div className={styles.screenImange}>
                    <Image src={vate} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>投票終了</div>
                  <div className={styles.screenImange}>
                    <Image src={voteFinish} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}>結果発表</div>
                  <div className={styles.screenImange}>
                    <Image src={result} />
                  </div>
                </div>
              </SplideSlide>
            </Splide>
          </div>
        </div>
        <div className={styles.SplideItems}>
          <div className={styles.nav}>
            <div className={styles.navText}>討論を作る</div>
          </div>
          <div className={styles.Splide}>
            <Splide
              aria-label="遊び方"
              options={{
                autoplay: false // 自動再生を無効
              }}>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}> 空いているROOMを選びます</div>
                  <div className={styles.screenImange}>
                    <Image src={timelineNone} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}> 議題を入力します</div>
                  <div className={styles.screenImange}>
                    <Image src={post1} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}> 討論を入力します</div>
                  <div className={styles.screenImange}>
                    <Image src={post2} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}> 概要を入力します</div>
                  <div className={styles.screenImange}>
                    <Image src={post3} />
                  </div>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className={styles.secssionItem}>
                  <div className={styles.secssionText}> 内容を確認して「完了」をクリック！</div>
                  <div className={styles.screenImange}>
                    <Image src={post4} />
                  </div>
                </div>
              </SplideSlide>
            </Splide>
          </div>
        </div>
      </div>
      <div className={styles.footer}><Footer /></div>
    </div >
  );
}