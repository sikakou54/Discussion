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
                    'none' === attendees.positive.userId
                        ? <button className={styles.selectItem} onClick={() => setSelectedJoinType(1)} disabled={false}><div className={styles.attendeesText} >{attendees.positive.text}</div></button>
                        : <button className={styles.selectItem} onClick={() => setSelectedJoinType(1)} disabled={true}><div className={styles.attendeesText} >{attendees.positive.text}</div></button>
                }
                
                {
                    'none' === attendees.negative.userId
                        ? <button className={styles.selectItem} onClick={() => setSelectedJoinType(2)} disabled={false}><div className={styles.attendeesText} >{attendees.negative.text}</div></button>
                        : <button className={styles.selectItem} onClick={() => setSelectedJoinType(2)} disabled={true}><div className={styles.attendeesText} >{attendees.negative.text}</div></button>
                }
                {
                    100 > attendees.watchers.length
                        ? <button className={styles.selectItem} onClick={() => setSelectedJoinType(3)} disabled={false}>視聴する</button>
                        : <button className={styles.selectItem} onClick={() => setSelectedJoinType(3)} disabled={true}>視聴</button>
                }
            </div>
            {
                undefined === selectedJoinType
                    ? <button className={styles.joinButton} disabled={true} onClick={onClick}>参加する</button>
                    : <button className={styles.joinButton} disabled={false} onClick={onClick}>参加する</button>
            }
        </div>
    );
}
