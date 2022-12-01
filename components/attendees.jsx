export default function Attendees({ attendees }) {

    return (
        <div className={styles.joinTypeWrapper}>
            {
                'none' === attendees.positive.userId
                    ? <div className={styles.joinType} onClick={() => { onJoin(1) }}>肯定</div>
                    : <div className={styles.joinType} >Positive</div>
            }
            {
                'none' === attendees.negative.userId
                    ? <div className={styles.joinType} onClick={() => { onJoin(2) }}>否定</div>
                    : <div className={styles.joinType} >Negative</div>
            }
            {
                100 > attendees.watchers.length
                    ? <div className={styles.joinType} onClick={() => { onJoin(3) }}>視聴</div>
                    : <div className={styles.joinType} >Watchers</div>
            }
        </div>
    );
}
