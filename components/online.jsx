import { useEffect } from "react";
import styles from '../styles/Online.module.css';

export default function Online({ finishTime, currentTime }) {

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
            <div className={styles.inner}>
                <div>オンライン</div>
                <div>time:{Math.floor((finishTime - currentTime) / 1000)}</div>
            </div>
        </div>
    );
}
