import { useEffect } from "react";
import styles from '../styles/Ready.module.css';
import UserIcon from "./userIcon";

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
            <div className={styles.title}>{title}</div>
            <div className={styles.message}>
                <div className={styles.main}>接続しています</div>
                <div className={styles.sub}>(スピーカの方はマイクを’オン’にして下さい)</div>
            </div>

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
