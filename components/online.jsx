import { useEffect } from "react";
import styles from '../styles/Online.module.css';
import user from '../public/user.svg';
import Image from "next/image";
import ProgressBar from './progressBar';
import Attendee from "./attendee";

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
                <div className={styles.watcher}><div className={styles.watcherIcon}>< Image src={user} /></div>{attendees.watchers.length}</div>
            </div>
            <div className={styles.message}>
                {
                    true === isStart
                        ? <>
                            <div className={styles.main}>討論中</div>
                            <div className={styles.sub}>
                                <div className={styles.ProgressBar}>
                                    <ProgressBar
                                        text={Math.floor((finishTime - currentTime) / 1000)}
                                        percent={
                                            (Math.floor((finishTime - currentTime) / 1000) / 600 * 100)
                                        } />
                                </div>
                            </div>
                        </>
                        : <>
                            <div className={styles.main}>まもなく始まります</div>
                        </>
                }
            </div>
            <div className={styles.attendees}><Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee></div>
            <div className={styles.attendees}><Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee></div>
        </div>
    );
}
