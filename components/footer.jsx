import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {

    return (
        <footer className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.nav}>
                    <Link href="/">
                        <a className={styles.navItem}>ホーム</a>
                    </Link>
                    <Link href="/PrivacyPolicy">
                        <a className={styles.navItem}>サイトポリシー</a>
                    </Link>
                    <Link href="/info">
                        <a className={styles.navItem}>お問い合わせ</a>
                    </Link>
                </div>
                <div className={styles.cpylight}>© 2023 TalkUp</div>
            </div>
        </footer>
    );
}
