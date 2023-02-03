import { useEffect } from "react";
import styles from '../styles/Standby.module.css';
import UserIcon from "./userIcon";

export default function Standby({ attendees, title }) {

    console.log(attendees);

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
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>参加者を待っています</div>

            {
                attendees.positive.userId === 'none'
                    ? <div className={`${styles.attendees} ${styles.disable}`}>< UserIcon userId={attendees.positive.userId} />{attendees.positive.text}</div>
                    : <div className={`${styles.attendees} ${styles.enable}`}>< UserIcon userId={attendees.positive.userId} />{attendees.positive.text}</div>
            }

            {
                attendees.negative.userId === 'none'
                    ? <div className={`${styles.attendees} ${styles.disable}`}>< UserIcon userId={attendees.negative.userId} />{attendees.negative.text}</div>
                    : <div className={`${styles.attendees} ${styles.enable}`}>< UserIcon userId={attendees.negative.userId} />{attendees.negative.text}</div>
            }

            {
                attendees.watchers.length <= 0
                    ? <div className={`${styles.attendees} ${styles.disable}`}>< UserIcon userId={'none'} />{attendees.watchers.length}</div>
                    : <div className={`${styles.attendees} ${styles.enable}`}>< UserIcon userId={'none'} />{attendees.watchers.length}</div>
            }

        </div>
    );
}
