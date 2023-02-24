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
                {
                    'none' === attendees.positive.userId ?
                        (
                            selectedJoinType === 1 ?
                                (
                                    <button className={`${styles.selectItem} ${styles.selected}`} disabled={false}>
                                        <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
                                    </button>
                                ) : (
                                    <button className={`${styles.selectItem} ${styles.enable}`} onClick={() => setSelectedJoinType(1)} disabled={false}>
                                        <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
                                    </button>
                                )
                        ) : (
                            <button className={`${styles.selectItem} ${styles.disable}`} onClick={() => setSelectedJoinType(1)} disabled={true}>
                                <Attendee userId={attendees.positive.userId}>{attendees.positive.text}</Attendee>
                            </button>
                        )
                }
                {
                    'none' === attendees.negative.userId ?
                        (
                            selectedJoinType === 2 ?
                                (
                                    <button className={`${styles.selectItem} ${styles.selected}`} disabled={false}>
                                        <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
                                    </button>
                                ) : (
                                    <button className={`${styles.selectItem} ${styles.enable}`} onClick={() => setSelectedJoinType(2)} disabled={false}>
                                        <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
                                    </button>
                                )
                        ) : (
                            <button className={`${styles.selectItem} ${styles.disable}`} onClick={() => setSelectedJoinType(2)} disabled={true}>
                                <Attendee userId={attendees.negative.userId}>{attendees.negative.text}</Attendee>
                            </button>
                        )
                }
                {
                    100 > attendees.watchers.length ?
                        (
                            selectedJoinType === 3 ?
                                (
                                    <button className={`${styles.selectItem} ${styles.selected}`} disabled={false}>
                                        <Attendee userId={'none'}>視聴する</Attendee>
                                    </button>
                                ) : (
                                    <button className={`${styles.selectItem} ${styles.enable}`} onClick={() => setSelectedJoinType(3)} disabled={false}>
                                        <Attendee userId={'none'}>視聴する</Attendee>
                                    </button>
                                )
                        ) : (
                            <button className={`${styles.selectItem} ${styles.disable}`} onClick={() => setSelectedJoinType(3)} disabled={true}>
                                <Attendee userId={'none'}>視聴する</Attendee>
                            </button>
                        )
                }
            </div>
            {
                undefined === selectedJoinType
                    ? <button className={`${styles.joinButton} ${styles.buttonDisable}`} disabled={true} onClick={onClick}>参加する</button>
                    : <button className={`${styles.joinButton} ${styles.buttonEnable}`} disabled={false} onClick={onClick}>参加する</button>
            }
        </div>
    );
}
