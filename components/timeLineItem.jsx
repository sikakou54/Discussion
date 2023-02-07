import { BsHeart } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { getTimeStamp, getTimeStampToLocaleString } from "../api/utils";
import DiscussionLabel from "./discussionLabel";
import Progress from "./progress";
import UserIcon from "./userIcon";
import styles from '../styles/TimeLineItem.module.css';

export default function TimeLineItem({ postId, progress, userId, title, positive, negative, watchers, createAt, onClick }) {

    return (
        <div className={styles.container} onClick={() => { onClick(postId) }} >

            <div className={styles.status}>
                <div className={styles.progress} >
                    <Progress progress={progress} />
                </div>
                <div className={styles.userIcon} >
                    <UserIcon userId={userId} width={45} height={45} />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>{title}</div>
                <div className={styles.discussionLabelContainer}>
                    <div className={styles.discussionLabelItems}>
                        <DiscussionLabel userId={positive.userId} text={positive.text} />
                    </div>
                    <div className={styles.discussionLabelItems}>
                        <DiscussionLabel userId={negative.userId} text={negative.text} />
                    </div>
                    <div className={styles.discussionLabelItemsWatcher}>
                        <DiscussionLabel userId={'none'} text={watchers.length} />
                    </div>
                </div>
                <div className={styles.date}>{getTimeStampToLocaleString(createAt)}</div>
            </div>
        </div>
    );
}
