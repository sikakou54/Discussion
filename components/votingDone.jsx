import { useEffect } from "react";
import styles from '../styles/VotingDone.module.css';

export default function VotingDone({ title }) {

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
            <div className={styles.titleSeccsion}>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.statusSeccsion}>
                <div className={styles.inner}>
                    <div className={styles.main}>投票終了</div>
                    <div className={styles.sub}>(結果をお待ち下さい)</div>
                </div>
            </div>
        </div>
    );

}
