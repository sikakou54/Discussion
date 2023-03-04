import { useEffect, useState } from 'react';
import styles from '../styles/Vote.module.css';
import Attendee from './attendee';
import ProgressBar from './progressBar';

export default function Vote({ attendees, title, type, setVotindDone, limitTime, currentTime }) {

    const [vote, setVote] = useState('');
    const [isVoteDone, setIsVoteDone] = useState(false);

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

    function onVoteClick() {
        setVotindDone(vote);
        setIsVoteDone(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleSeccsion}>
                <div className={styles.title}>{title}</div>
            </div>
            {
                type === 3 ? (
                    isVoteDone === true ? (
                        <div className={styles.statusSeccsion}>
                            <div className={styles.inner}>
                                <div className={styles.main}>ありがとうございます</div>
                                <div className={styles.ProgressBar}>
                                    <ProgressBar
                                        text={Math.floor((limitTime - currentTime) / 1000)}
                                        percent={
                                            (Math.floor((limitTime - currentTime) / 1000) / 30 * 100)
                                        } />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.statusSeccsion}>
                                <div className={styles.inner}>
                                    <div className={styles.main}>投票中</div>
                                    <div className={styles.ProgressBar}>
                                        <ProgressBar
                                            text={Math.floor((limitTime - currentTime) / 1000)}
                                            percent={
                                                (Math.floor((limitTime - currentTime) / 1000) / 30 * 100)
                                            } />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.attendeesSeccsion}>
                                <div className={styles.inner}>
                                    <div className={styles.attendeesSeccsionItems}>
                                        {
                                            vote === 'positive'
                                                ? <div className={`${styles.selected}`} onClick={() => setVote('positive')}><Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee></div>
                                                : <div className={styles.selectItem} onClick={() => setVote('positive')}><Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee></div>
                                        }
                                    </div>
                                    <div className={styles.attendeesSeccsionItems}>
                                        {
                                            vote === 'negative'
                                                ? <div className={` ${styles.selected}`} onClick={() => setVote('negative')}><Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee></div>
                                                : <div className={styles.selectItem} onClick={() => setVote('negative')}><Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee></div>
                                        }
                                    </div>
                                    <div className={styles.attendeesSeccsionItems}>
                                        {
                                            '' === vote
                                                ? <button className={`${styles.voteButton} ${styles.disable}`} disabled={true} onClick={onVoteClick}>投票する</button>
                                                : <button className={`${styles.voteButton} ${styles.enable}`} disabled={false} onClick={onVoteClick}>投票する</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                ) : (
                    <div className={styles.statusSeccsion}>
                        <div className={styles.inner}>
                            <div className={styles.main}>投票中</div>
                            <div className={styles.ProgressBar}>
                                <ProgressBar
                                    text={Math.floor((limitTime - currentTime) / 1000)}
                                    percent={
                                        (Math.floor((limitTime - currentTime) / 1000) / 30 * 100)
                                    } />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
