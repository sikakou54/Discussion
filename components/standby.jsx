import { useEffect } from "react";
import styles from '../styles/Standby.module.css';

export default function Standby() {

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
        <div className={styles.outer}>
            <div className={styles.inner}>参加者を待っています</div>
        </div>
    );
}
