import UserIcon from "./userIcon";
import styles from '../styles/DiscussionLabel.module.css';

export default function DiscussionLabel({ userId, text }) {

    return (
        <div className={styles.container}>
            <div className={styles.userIcon}><UserIcon userId={userId} width={25} height={25} /></div>
            <div>{text}</div>
        </div>
    );
}
