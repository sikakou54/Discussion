import { useState } from 'react';
import styles from '../styles/Select.module.css';
import UserIcon from './userIcon';

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
            <textarea className={styles.detail}>{detail}</textarea>
            <div className={styles.selectItems}>
                {
                    'none' === attendees.positive.userId
                        ? <button className={styles.selectItem} onClick={() => setSelectedJoinType(1)} disabled={false}>{attendees.positive.text}</button>
                        : <button className={styles.selectItem} onClick={() => setSelectedJoinType(1)} disabled={true}>{attendees.positive.text}</button>
                }
                {
                    'none' === attendees.negative.userId
                        ? <button className={styles.selectItem} onClick={() => setSelectedJoinType(1)} disabled={false}>{attendees.negative.text}</button>
                        : <button className={styles.selectItem} onClick={() => setSelectedJoinType(1)} disabled={true}>{attendees.negative.text}</button>
                }
                {
                    100 > attendees.watchers.length
                        ? <button className={styles.selectItem} onClick={() => setSelectedJoinType(3)} disabled={false}>視聴</button>
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
