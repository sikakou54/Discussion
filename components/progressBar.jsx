import styles from '../styles/ProgressBar.module.css';

export default function ProgressBar({ text, percent }) {

    return (
        <div className={styles.progressFrame}>
            <div className={styles.text}>{text}</div>
            <div className={styles.progressValueGreen} style={{
                width: percent + '%'
            }}></div>
            <div className={styles.progressValueRed} style={{
                width: (100 - percent) + '%'
            }}></div>
        </div>
    );
}
