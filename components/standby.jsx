import { useEffect } from "react";
import styles from '../styles/Standby.module.css';
import user from '../public/user.svg';
import Image from "next/image";
import Attendee from "./attendee";

export default function Standby({ attendees, title }) {

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
            </div>
            <div className={styles.message}>
                <div className={styles.main}>参加者を待っています</div>
                <div className={styles.sub}>( 討論者2名,視聴者3人以上が必要 )</div>
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
            {
                attendees.watchers.length >= 3
                    ? <div className={`${styles.watcher}`}><div className={styles.watcherIcon}>< Image src={user} /></div >{attendees.watchers.length}</div>
                    : <div className={`${styles.watcher}`}><div className={styles.watcherIcon}>< Image src={user} /></div>{attendees.watchers.length}</div>
            }
        </div>
    );
}
