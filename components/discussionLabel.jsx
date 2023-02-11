import styles from '../styles/DiscussionLabel.module.css';

export default function DiscussionLabel({ children }) {

    return (
        <div className={styles.container}>
            <div className={styles.labelText}>{children}</div>
        </div>
    );
}
