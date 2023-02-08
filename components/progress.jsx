import { useEffect, useState } from "react";
import styles from '../styles/Progress.module.css';

export default function Progress({ progress }) {

    const [text, setText] = useState('?');

    useEffect(() => {

        switch (progress) {

            case 'standby':
                setText('待機中');
                break;

            case 'standby':
                setText('待機中');
                break;

            case 'ready':
                setText('準備中');
                break;

            case 'discussion':
                setText('討論中');
                break;

            case 'vote':
                setText('投票中');
                break;

            case 'result':
                setText('結果発表中');
                break;

            default:
                setText('unkown');
                break;
        }

    }, []);

    return (
        <div className={styles.container}>{text}</div>
    );

}
