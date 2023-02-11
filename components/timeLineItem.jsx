import { getTimeStampToLocaleString } from "../api/utils";
import DiscussionLabel from "./discussionLabel";
import Progress from "./progress";
import styles from '../styles/TimeLineItem.module.css';
import Image from "next/image";
import user from '../public/user.svg';

export default function TimeLineItem({ postId, progress, title, positive, negative, watchers, createAt, onClick }) {

    return (
        <button className={styles.container} onClick={() => { onClick(postId) }} >
            <div className={styles.status}>
                <div className={styles.progress} >
                    <Progress progress={progress} />
                </div>
            </div>
            <div className={styles.contents}>
                <div className={styles.title}>{title}</div>
                <div className={styles.discussionLabelContainer}>
                    <div className={styles.discussionLabelItems}>
                        <DiscussionLabel>
                            <div className={styles.attendessContainer}>
                                {
                                    positive.userId === 'none'
                                        ? <>{positive.text}</>
                                        : <><div className={styles.userIcon}>< Image src={user} /></div><div className={styles.attendessText}>{positive.text}</div></>
                                }
                            </div>
                        </DiscussionLabel>
                    </div>
                    <div className={styles.discussionLabelItems}>
                        <DiscussionLabel>
                            <div className={styles.attendessContainer}>
                                {
                                    negative.userId === 'none'
                                        ? <>{negative.text}</>
                                        : <><div className={styles.userIcon}>< Image src={user} /></div><div className={styles.attendessText}>{negative.text}</div></>
                                }
                            </div>
                        </DiscussionLabel>
                    </div>
                    <div className={styles.discussionLabelItemsWatcher}>
                        <DiscussionLabel>
                            <div className={styles.watcherCount}>
                                <div className={styles.userIcon}>< Image src={user} /></div>
                                <div className={styles.watcherText}>{watchers.length}</div>
                            </div>
                        </DiscussionLabel>
                    </div>
                </div>
                <div className={styles.date}>{getTimeStampToLocaleString(createAt)}</div>
            </div>
        </button>
    );
}
