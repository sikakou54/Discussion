import styles from '../styles/TimeLineView.module.css';
import TimeLineItem from "./timeLineItem";
import Router from 'next/router';

export default function TimeLineView({ userId, items, onClick }) {

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
            {
                items.map((value, index) => {
                    return <div className={styles.timeLineItem} key={index}>
                        <TimeLineItem index={index} pub={value.pub} country={value.country} postId={value.postId} progress={value.progress} userId={value.userId} title={value.title} positive={value.positive} negative={value.negative} watchers={value.watchers} createAt={value.createAt} onClick={onClick} onMakeRoom={onMakeRoom} />
                    </div>
                })
            }
        </div>
    );
}
