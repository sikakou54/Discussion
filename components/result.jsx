import { useEffect } from "react";
import styles from '../styles/Result.module.css';
import UserIcon from "./userIcon";
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
            <div className={styles.message}>
                <div className={styles.main}>結果発表</div>
            </div>

            <div className={styles.resultArea}>
                <div className={styles.box}>
                    <div className={styles.attendees}>< UserIcon userId={attendees.positive.userId} />{attendees.positive.text}</div>
                    <div className={styles.center}>
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
                    </div>
                </div>

                <div className={styles.box}>
                    <div className={styles.attendees}>< UserIcon userId={attendees.negative.userId} />{attendees.negative.text}</div>
                    <div className={styles.center}>
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
                    </div>
                </div>
            </div>

            <button className={styles.return} onClick={() => Router.push('/posts')}>戻る</button>
        </div>
    );
}
