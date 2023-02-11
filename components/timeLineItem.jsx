import { getTimeStampToLocaleString } from "../api/utils";
import DiscussionLabel from "./discussionLabel";
import Progress from "./progress";
import styles from '../styles/TimeLineItem.module.css';
import Image from "next/image";
import user from '../public/user.svg';

export default function TimeLineItem({ postId, progress, userId, title, positive, negative, watchers, createAt, onClick }) {

    return (
        <div className={styles.container} onClick={() => { onClick(postId) }} >

            <div className={styles.status}>
                <div className={styles.progress} >
                    <Progress progress={progress} />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>{title}</div>
                <div className={styles.discussionLabelContainer}>
                    <div className={styles.discussionLabelItems}>
                        <DiscussionLabel>{positive.text} </DiscussionLabel>
                    </div>
                    <div className={styles.discussionLabelItems}>
                        <DiscussionLabel>{negative.text} </DiscussionLabel>
                    </div>
                    <div className={styles.discussionLabelItemsWatcher}>
                        <DiscussionLabel>
                            <div className={styles.watcherCount}>
                                <div className={styles.watcherIcon}>< Image src={user} /></div>
                                <div className={styles.watcherText}>{watchers.length}</div>
                            </div>
                        </DiscussionLabel>
                    </div>
                </div>
                <div className={styles.date}>{getTimeStampToLocaleString(createAt)}</div>
            </div>
        </div>
    );
}
