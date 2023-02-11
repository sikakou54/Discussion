import { useEffect } from "react";
import styles from '../styles/Result.module.css';
import Router from 'next/router';

export default function Result({ attendees, title, result }) {

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
            <div className={styles.attendees}>
                {
                    result.positive > result.negative
                        ? <div className={styles.win}>WIN</div>
                        : null
                }
                {
                    result.positive < result.negative
                        ? <div className={styles.lose}>LOSE</div>
                        : null
                }
                {
                    result.positive === result.negative
                        ? <div className={styles.draw}>DRAW</div>
                        : null
                }
                <div className={styles.attendeesText} >{attendees.positive.text}</div>
            </div>
            <div className={styles.attendees}>
                {
                    result.positive > result.negative
                        ? <div className={styles.lose}>LOSE</div>
                        : null
                }
                {
                    result.positive < result.negative
                        ? <div className={styles.win}>WIN</div>
                        : null
                }
                {
                    result.positive === result.negative
                        ? <div className={styles.draw}>DRAW</div>
                        : null
                }
                <div className={styles.attendeesText} >{attendees.negative.text}</div>
            </div>
            <button className={styles.return} onClick={() => Router.push('/posts')}>戻る</button>
        </div >
    );
}
