import { useState } from 'react';
import styles from '../styles/Select.module.css';
import Attendee from './attendee';

export default function Select({ onJoin, attendees, title, detail }) {

    const [selectedJoinType, setSelectedJoinType] = useState(undefined);

    function onClick() {
        if (undefined !== selectedJoinType) {
            onJoin(selectedJoinType);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <textarea value={detail} className={styles.detail} readOnly />
            <div className={styles.selectItems}>
                <div className={styles.selectItem}>
                    {
                        'none' === attendees.positive.userId ?
                            (
                                selectedJoinType === 1 ?
                                    (
                                        <div className={`${styles.attendees} ${styles.selected}`} disabled={false}>
                                            <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
                                        </div>
                                    ) : (
                                        <div className={`${styles.attendees} ${styles.enable}`} onClick={() => setSelectedJoinType(1)} disabled={false}>
                                            <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
                                        </div>
                                    )
                            ) : (
                                <div className={`${styles.attendees} ${styles.disable}`} onClick={() => setSelectedJoinType(1)} disabled={true}>
                                    <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
                                </div>
                            )
                    }
                </div>
                <div className={styles.selectItem}>
                    {
                        'none' === attendees.negative.userId ?
                            (
                                selectedJoinType === 2 ?
                                    (
                                        <div className={`${styles.attendees} ${styles.selected}`} disabled={false}>
                                            <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
                                        </div>
                                    ) : (
                                        <div className={`${styles.attendees} ${styles.enable}`} onClick={() => setSelectedJoinType(2)} disabled={false}>
                                            <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
                                        </div>
                                    )
                            ) : (
                                <div className={`${styles.attendees} ${styles.disable}`} onClick={() => setSelectedJoinType(2)} disabled={true}>
                                    <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
                                </div>
                            )
                    }
                </div>
                <div className={styles.selectItem}>
                    {
                        100 > attendees.watchers.length ?
                            (
                                selectedJoinType === 3 ?
                                    (
                                        <div className={`${styles.attendees} ${styles.selected}`} disabled={false}>
                                            <Attendee userId={'none'}>視聴する</Attendee>
                                        </div>
                                    ) : (
                                        <div className={`${styles.attendees} ${styles.enable}`} onClick={() => setSelectedJoinType(3)} disabled={false}>
                                            <Attendee userId={'none'}>視聴する</Attendee>
                                        </div>
                                    )
                            ) : (
                                <div className={`${styles.attendees} ${styles.disable}`} onClick={() => setSelectedJoinType(3)} disabled={true}>
                                    <Attendee userId={'none'}>視聴する</Attendee>
                                </div>
                            )
                    }
                </div>
            </div>
            {
                undefined === selectedJoinType
                    ? <div className={`${styles.joinButton} ${styles.buttonDisable}`} disabled={true} onClick={onClick}>参加する</div>
                    : <div className={`${styles.joinButton} ${styles.buttonEnable}`} disabled={false} onClick={onClick}>参加する</div>
            }
        </div>
    );
}
