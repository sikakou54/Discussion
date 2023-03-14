import DiscussionLabel from "./discussionLabel";
import Progress from "./progress";
import styles from '../styles/TimeLineItem.module.css';
import Image from "next/image";
import user from '../public/user.svg';
import makeRoom from '../public/makeRoom.svg';

export default function TimeLineItem({ pub, index, country, postId, progress, title, positive, negative, watchers, onClick, onMakeRoom }) {
    return (
        <>
            {
                true === pub ?
                    (
                        <div key={index} className={styles.container} onClick={() => { onClick(postId) }}>
                            <div className={styles.status}>
                                <div className={styles.progress} >
                                    <Progress progress={progress} />
                                </div>
                                <div className={styles.roomNum} >ROOM{postId}</div>
                            </div>
                            <div className={styles.contents}>
                                <div className={styles.title}>{title}</div>
                                <div className={styles.discussionLabelContainer}>
                                    <div className={styles.discussionLabelItems}>
                                        {
                                            positive.userId === 'none' ?
                                                (
                                                    <DiscussionLabel disabled={false}>
                                                        <div className={styles.attendessContainer}>
                                                            <div className={styles.attendessText}>{positive.text}</div>
                                                        </div>
                                                    </DiscussionLabel>
                                                ) :
                                                (
                                                    <DiscussionLabel disabled={true}>
                                                        <div className={styles.attendessContainer}>
                                                            <div className={styles.userIcon}>< Image src={user} /></div><div className={styles.attendessText}>{positive.text}</div>
                                                        </div>
                                                    </DiscussionLabel>
                                                )
                                        }
                                    </div>
                                    <div className={styles.discussionLabelItems}>
                                        {
                                            negative.userId === 'none' ?
                                                (
                                                    <DiscussionLabel disabled={false}>
                                                        <div className={styles.attendessContainer}>
                                                            <div className={styles.attendessText}>{negative.text}</div>
                                                        </div>
                                                    </DiscussionLabel>
                                                ) :
                                                (
                                                    <DiscussionLabel disabled={true}>
                                                        <div className={styles.attendessContainer}>
                                                            <div className={styles.userIcon}>< Image src={user} /></div><div className={styles.attendessText}>{negative.text}</div>
                                                        </div>
                                                    </DiscussionLabel>
                                                )
                                        }
                                    </div>
                                    <div className={styles.discussionLabelItemsWatcher}>
                                        {
                                            100 > watchers.length ?
                                                (
                                                    <DiscussionLabel disabled={false}>
                                                        <div className={styles.watcherCount}>
                                                            <div className={styles.userIcon}>< Image src={user} /></div>
                                                            <div className={styles.watcherText}>{watchers.length}</div>
                                                        </div>
                                                    </DiscussionLabel>
                                                ) : (
                                                    <DiscussionLabel disabled={true}>
                                                        <div className={styles.watcherCount}>
                                                            <div className={styles.userIcon}>< Image src={user} /></div>
                                                            <div className={styles.watcherText}>{watchers.length}</div>
                                                        </div>
                                                    </DiscussionLabel>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className={styles.container} onClick={() => onMakeRoom(country, postId)}>
                            <div className={styles.roomNum}>ROOM{postId}</div>
                            <div className={styles.makeRoomText}>
                                <div className={styles.postIcon}>
                                    < Image src={makeRoom} />
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    );
}
