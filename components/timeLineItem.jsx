import { getTimeStampToLocaleString } from "../api/utils";
import DiscussionLabel from "./discussionLabel";
import Progress from "./progress";
import styles from '../styles/TimeLineItem.module.css';
import Image from "next/image";
import user from '../public/user.svg';
import makeRoom from '../public/makeRoom.svg';

export default function TimeLineItem({ pub, index, country, postId, progress, title, positive, negative, watchers, createAt, onClick, onMakeRoom }) {

    if (pub) {
        return (
            <div key={index} className={styles.container} onClick={() => { onClick(postId) }}>
                <div className={styles.status}>
                    <div className={styles.progress} >
                        <Progress progress={progress} />
                    </div>
                    <div className={styles.roomNum} >ROOM{postId}</div>
                </div>
                <div className={styles.contents}>
                    <div className={styles.title}><u>{title}</u></div>
                    <div className={styles.discussionLabelContainer}>
                        <div className={styles.discussionLabelItems}>
                            <DiscussionLabel>
                                <div className={styles.attendessContainer}>
                                    {
                                        positive.userId === 'none'
                                            ? <div className={styles.attendessText}>{positive.text}</div>
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
                                            ? <div className={styles.attendessText}>{negative.text}</div>
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
                    <div className={styles.contensFooter}>
                        <div className={styles.date}>{getTimeStampToLocaleString(createAt)}</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
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

}
