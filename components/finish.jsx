import { useEffect } from "react";
import styles from '../styles/Finish.module.css';

export default function Finish() {

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
                <div>討論終了</div>
                <div>投票の準備をしています</div>
            </div>
        </div>
    );
}
