import { useEffect } from "react";
import styles from '../styles/Ready.module.css';
import user from '../public/user.svg';
import Image from "next/image";
import Attendee from "./attendee";

export default function Ready({ attendees, title }) {

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
                <div className={styles.main}>接続しています</div>
                <div className={styles.sub}>(スピーカの方はマイクを’オン’にして下さい)</div>
            </div>
            {
                attendees.positive.userId === 'none'
                    ? <div className={`${styles.attendees} ${styles.disable}`}><Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee></div>
                    : <div className={`${styles.attendees} ${styles.enable}`}><Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee></div>
            }
            {
                attendees.negative.userId === 'none'
                    ? <div className={`${styles.attendees} ${styles.disable}`}><Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee></div>
                    : <div className={`${styles.attendees} ${styles.enable}`}><Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee></div>
            }
        </div>
    );
}
