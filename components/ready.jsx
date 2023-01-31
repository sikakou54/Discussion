import { useEffect } from "react";
import styles from '../styles/Ready.module.css';

export default function Ready() {

    useEffect(() => {

        window.onbeforeunload = (event) => {
            event.preventDefault();
            event.returnValue = 'このページを離れますか？'; // Google Chrome
            return 'このページを離れますか？'; // Google Chrome以外
        }

        return () => {
            window.onbeforeunload = null;
        };

    }, []);

    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <div>接続しています</div>
                <div>スピーカの方はマイクを’オン’にして下さい</div>
            </div>
        </div>
    );
}
