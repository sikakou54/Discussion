import styles from '../styles/Result.module.css';
import Attendee from "./attendee";

export default function Result({ onReturn, attendees, title, result }) {


    return (
        <div className={styles.container}>
            <div className={styles.titleSeccsion}>
                <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.statusSeccsion}>
                <div className={styles.inner}>
                    <div className={styles.main}>結果発表</div>
                </div>
            </div>
            <div className={styles.attendeesSeccsion}>
                <div className={styles.inner}>
                    <div className={styles.attendeesSeccsionItems}>
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
                    </div>
                    <div className={styles.attendeesSeccsionItems}>
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
                    </div>
                    <div className={styles.attendeesSeccsionItems}>
                        <button className={styles.return} onClick={onReturn}>戻る</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
