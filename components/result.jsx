import styles from '../styles/Result.module.css';
import Router from 'next/router';
import Attendee from "./attendee";

export default function Result({ onReturn, attendees, title, result }) {

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
                <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
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
                <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
            </div>
            <button className={styles.return} onClick={onReturn}>戻る</button>
        </div >
    );
}
