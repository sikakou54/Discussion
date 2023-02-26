import styles from '../styles/TimeLineView.module.css';
import TimeLineItem from "./timeLineItem";
import Router from 'next/router';
import { useState } from 'react';

export default function TimeLineView({ userId, items, onClick }) {

    const [standby, setStandby] = useState(false);
    const [discussion, setDiscussion] = useState(false);

    function onMakeRoom(_country, _potId) {
        Router.push({
            pathname: '/post',
            query: {
                postId: _potId,
                country: _country,
                userId
            }
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.secssionFillter} >
                {
                    standby === true ?
                        (
                            <button className={`${styles.selectItem} ${styles.selected}`} onClick={() => { setStandby((standby) => !standby) }}>待機中</button>
                        ) : (
                            <button className={styles.selectItem} onClick={() => { setStandby((standby) => !standby) }}>待機中</button>
                        )
                }

                {
                    discussion === true ?
                        (
                            <button className={`${styles.selectItem} ${styles.selected}`} onClick={() => { setDiscussion((discussion) => !discussion) }}>討論中</button>
                        ) : (
                            <button className={styles.selectItem} onClick={() => { setDiscussion((discussion) => !discussion) }}>討論中</button>
                        )
                }

            </div>
            <div className={styles.secssionView}>
                <div className={styles.view}>
                    {
                        items.map((value, index) => {
                            if (standby === true && value.progress === 'standby' && value.pub === true) {
                                return <div className={styles.timeLineItem} key={index}>
                                    <TimeLineItem index={index} pub={value.pub} country={value.country} postId={value.postId} progress={value.progress} userId={value.userId} title={value.title} positive={value.positive} negative={value.negative} watchers={value.watchers} createAt={value.createAt} onClick={onClick} onMakeRoom={onMakeRoom} />
                                </div>
                            } else if (discussion === true && value.progress === 'discussion' && value.pub === true) {
                                return <div className={styles.timeLineItem} key={index}>
                                    <TimeLineItem index={index} pub={value.pub} country={value.country} postId={value.postId} progress={value.progress} userId={value.userId} title={value.title} positive={value.positive} negative={value.negative} watchers={value.watchers} createAt={value.createAt} onClick={onClick} onMakeRoom={onMakeRoom} />
                                </div>
                            } else if (standby === false && discussion === false) {
                                return <div className={styles.timeLineItem} key={index}>
                                    <TimeLineItem index={index} pub={value.pub} country={value.country} postId={value.postId} progress={value.progress} userId={value.userId} title={value.title} positive={value.positive} negative={value.negative} watchers={value.watchers} createAt={value.createAt} onClick={onClick} onMakeRoom={onMakeRoom} />
                                </div>
                            }
                        })
                    }
                </div >
            </div>

        </div>

    );
}
