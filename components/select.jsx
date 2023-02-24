import { useState } from 'react';
import styles from '../styles/Select.module.css';

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
                                        <div className={styles.attendeesText}>{attendees.positive.text}</div>
                                    </button>
                                ) : (
                                    <button className={`${styles.selectItem} ${styles.enable}`} onClick={() => setSelectedJoinType(1)} disabled={false}>
                                        <div className={styles.attendeesText} >{attendees.positive.text}</div>
                                    </button>
                                )
                        ) : (
                            <button className={`${styles.selectItem} ${styles.disable}`} onClick={() => setSelectedJoinType(1)} disabled={true}>
                                <div className={styles.attendeesText} >{attendees.positive.text}</div>
                            </button>
                        )
                }
                {
                    'none' === attendees.negative.userId ?
                        (
                            selectedJoinType === 2 ?
                                (
                                    <button className={`${styles.selectItem} ${styles.selected}`} disabled={false}>
                                        <div className={styles.attendeesText} >{attendees.negative.text}</div>
                                    </button>
                                ) : (
                                    <button className={`${styles.selectItem} ${styles.enable}`} onClick={() => setSelectedJoinType(2)} disabled={false}>
                                        <div className={styles.attendeesText} >{attendees.negative.text}</div>
                                    </button>
                                )
                        ) : (
                            <button className={`${styles.selectItem} ${styles.disable}`} onClick={() => setSelectedJoinType(2)} disabled={true}>
                                <div className={styles.attendeesText} >{attendees.positive.text}</div>
                            </button>
                        )
                }
                {
                    100 > attendees.watchers.length ?
                        (
                            selectedJoinType === 3 ?
                                (
                                    <button className={`${styles.selectItem} ${styles.selected}`} disabled={false}>
                                        <div className={styles.attendeesText} >視聴する</div>
                                    </button>
                                ) : (
                                    <button className={`${styles.selectItem} ${styles.enable}`} onClick={() => setSelectedJoinType(3)} disabled={false}>
                                        <div className={styles.attendeesText} >視聴する</div>
                                    </button>
                                )
                        ) : (
                            <button className={`${styles.selectItem} ${styles.disable}`} onClick={() => setSelectedJoinType(3)} disabled={true}>
                                <div className={styles.attendeesText} >視聴する</div>
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
