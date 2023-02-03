import styles from '../styles/TimeLineView.module.css';
import TimeLineItem from "./timeLineItem";

export default function TimeLineView({ items, onClick }) {

    return (
        <>
            {
                items.map((value, index) => {
                    return <div key={index} className={styles.timeLineItem}><TimeLineItem postId={value.postId} progress={value.progress} userId={value.userId} title={value.title} positive={value.positive} negative={value.negative} watchers={value.watchers} createAt={value.createAt} onClick={onClick} /></div>
                })
            }
        </>
    );
}
