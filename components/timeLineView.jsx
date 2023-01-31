import { getTimeStampToLocaleString } from "../api/utils";
import styles from '../styles/Posts.module.css';
import UserIcon from "./userIcon";
import DiscussionLabel from "./discussionLabel";
import Progress from "./progress";
import heart from '../public/heart.svg';
import comment from '../public/comment.svg';
import Image from "next/image";
import { BsHeart } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';

export default function TimeLineView({ items, onClick }) {

    return (
        <>
            {
                items.map((value, index) => {
                    return (
                        <div key={index} >
                            <div className={styles.timeLineItems} onClick={() => { onClick(value.postId) }} >

                                <div className={styles.status}>
                                    <div className={styles.progress} >
                                        <Progress progress={value.progress} />
                                    </div>
                                    <div className={styles.userIcon} >
                                        <UserIcon userId={value.userId} width={45} height={45} />
                                    </div>
                                </div>

                                <div className={styles.contents}>
                                    <div className={styles.title}><u>{value.title}</u></div>
                                    {/* <div className={styles.detail}>{value.detail}</div> */}
                                    <div className={styles.discussionLabelContainer}>
                                        <div className={styles.discussionLabelItems}>
                                            <DiscussionLabel userId={value.positive.userId} text={value.positive.text} />
                                        </div>
                                        <div className={styles.discussionLabelItems}>
                                            <DiscussionLabel userId={value.negative.userId} text={value.negative.text} />
                                        </div>
                                        <div className={styles.discussionLabelItems}>
                                            <DiscussionLabel userId={'none'} text={value.watchers.length} />
                                        </div>
                                    </div>

                                    <div className={styles.stausBarContainer}>

                                        <div className={styles.statusContens}>
                                            <div className={styles.imageWrap}>
                                                <BsHeart />
                                            </div>
                                            <div>{0}</div>
                                        </div>

                                        <div className={styles.statusContens}>
                                            <div className={styles.imageWrap}>
                                                <FaRegCommentDots />
                                            </div>
                                            <div>{0}</div>
                                        </div>

                                        <div>{getTimeStampToLocaleString(value.createAt)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
}
