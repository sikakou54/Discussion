import { useState } from 'react';
import styles from '../styles/Select.module.css';
import SelectItem from './selectItem';

export default function Select({ onJoin, attendees }) {

    const [selectedJoinType, setSelectedJoinType] = useState(undefined);

    console.log('Select', attendees);

    function onClick() {
        if (undefined !== selectedJoinType) {
            onJoin(selectedJoinType);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.joinTypeWrapper}>
                {
                    'none' === attendees.positive.userId
                        ? <SelectItem onClick={() => setSelectedJoinType(1)} enable={true}>肯定</SelectItem>
                        : <SelectItem onClick={() => setSelectedJoinType(1)} enable={false}>肯定</SelectItem>
                }
                {
                    'none' === attendees.negative.userId
                        ? <SelectItem onClick={() => setSelectedJoinType(2)} enable={true}>否定</SelectItem>
                        : <SelectItem onClick={() => setSelectedJoinType(2)} enable={false}>否定</SelectItem>
                }
                {
                    100 > attendees.watchers.length
                        ? <SelectItem onClick={() => setSelectedJoinType(3)} enable={true}>視聴</SelectItem>
                        : <SelectItem onClick={() => setSelectedJoinType(3)} enable={false}>視聴</SelectItem>
                }
            </div>
            {
                undefined === selectedJoinType
                    ? <div className={styles.joinButtonDisable} onClick={onClick}>参加する</div>
                    : <div className={styles.joinButtonEnable} onClick={onClick}>参加する</div>
            }
        </div>
    );
}
