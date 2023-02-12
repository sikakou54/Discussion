import { useEffect } from "react";
import styles from '../styles/Online.module.css';
import user from '../public/user.svg';
import Image from "next/image";

export default function Online({ isStart, attendees, title, finishTime, currentTime }) {

    useEffect(() => {

        window.onbeforeunload = (event) => {
            event.preventDefault();
            event.returnValue = 'このページを離れますか？'; // Google Chrome
            return 'このページを離れますか？'; // Google Chrome以外
        }

        return () => {
            window.onbeforeunload = null;
        };

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.titleHeader}>
                <div className={styles.title}>{title}</div>
                {
                    attendees.watchers.length > 0
                        ? <div className={`${styles.watcher} ${styles.enable}`}><div className={styles.watcherIcon}>< Image src={user} /></div>{attendees.watchers.length}</div>
                        : <div className={`${styles.watcher} ${styles.disable}`}><div className={styles.watcherIcon}>< Image src={user} /></div>{attendees.watchers.length}</div>
                }
            </div>
            <div className={styles.message}>
                {
                    true === isStart
                        ? <>
                            <div className={styles.main}>討論中</div>
                            <div className={styles.sub}>time:{Math.floor((finishTime - currentTime) / 1000)}</div>
                        </>
                        : <>
                            <div className={styles.main}>まもなく始まります</div>
                            <div className={styles.sub}>(他の方の接続を待っています)</div>
                        </>
                }
            </div>
            {
                attendees.positive.userId === 'none'
                    ? <div className={`${styles.attendees} ${styles.disable}`}><div className={styles.attendeesText}>{attendees.positive.text}</div></div>
                    : <div className={`${styles.attendees} ${styles.enable}`}><div className={styles.attendeesIcon}>< Image src={user} /></div ><div className={styles.attendeesText}>{attendees.positive.text}</div></div>
            }
            {
                attendees.negative.userId === 'none'
                    ? <div className={`${styles.attendees} ${styles.disable}`}><div className={styles.attendeesText}>{attendees.negative.text}</div></div>
                    : <div className={`${styles.attendees} ${styles.enable}`}><div className={styles.attendeesIcon}>< Image src={user} /></div><div className={styles.attendeesText}>{attendees.negative.text}</div></div>
            }
        </div>
    );
}
