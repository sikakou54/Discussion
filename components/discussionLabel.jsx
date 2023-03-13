import styles from '../styles/DiscussionLabel.module.css';

export default function DiscussionLabel({ children, disabled }) {
    return (
        <>
            {
                false == disabled ?
                    (
                        <div className={`${styles.container} ${styles.enable}`}>
                            <div className={styles.labelText}>{children}</div>
                        </div>
                    ) : (
                        <div className={`${styles.container} ${styles.disable}`}>
                            <div className={styles.labelText}>{children}</div>
                        </div>
                    )
            }
        </>
    );
}
