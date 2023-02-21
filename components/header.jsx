import styles from '../styles/Header.module.css';
import Head from 'next/head';
import icon from '../public/talkup.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ title }) {

    return (
        <header className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            <Link href="/">
                <a className={styles.headerSectioin}>
                    <div className={styles.icon}>
                        <Image src={icon} />
                    </div>
                    <div className={styles.title}>TalkUp</div>
                </a>
            </Link>
        </header>
    );
}