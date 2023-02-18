import { useEffect, useState } from 'react';
import styles from '../styles/Vote.module.css';

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

    if (3 === type) {

        return (
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                {
                    isVoteDone === true
                        ?
                        <div className={styles.message}>
                            <div className={styles.main}>ありがとうございます</div>
                            <div className={styles.sub}>(しばらくお待ち下さい)</div>
                            <div className={styles.sub}>{Math.floor((limitTime - currentTime) / 1000)}</div>
                        </div>
                        :
                        <>
                            <div className={styles.message}>
                                <div className={styles.main}>投票中</div>
                                <div className={styles.sub}>{Math.floor((limitTime - currentTime) / 1000)}</div>
                            </div>
                            {
                                vote === 'positive'
                                    ? <button className={`${styles.selected}`} onClick={() => setVote('positive')}><div className={styles.attendeesText} >{attendees.positive.text}</div></button>
                                    : <button className={styles.selectItem} onClick={() => setVote('positive')}><div className={styles.attendeesText} >{attendees.positive.text}</div></button>
                            }
                            {
                                vote === 'negative'
                                    ? <button className={` ${styles.selected}`} onClick={() => setVote('negative')}><div className={styles.attendeesText} >{attendees.negative.text}</div></button>
                                    : <button className={styles.selectItem} onClick={() => setVote('negative')}><div className={styles.attendeesText} >{attendees.negative.text}</div></button>
                            }

                            {
                                '' === vote
                                    ? <button className={`${styles.voteButton} ${styles.disable}`} disabled={true} onClick={onVoteClick}>投票する</button>
                                    : <button className={`${styles.voteButton} ${styles.enable}`} disabled={false} onClick={onVoteClick}>投票する</button>
                            }
                        </>
                }
            </div>
        );

    } else {

        return (
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                <div className={styles.message}>
                    <div className={styles.main}>投票中</div>
                    <div className={styles.sub}>{Math.floor((limitTime - currentTime) / 1000)}</div>
                </div>
            </div>
        );
    }

}
