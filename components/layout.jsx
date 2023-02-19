import Footer from './footer';
import Header from './header';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title }) {

    return (
        <div className={styles.container}>
            <div className={styles.header}><Header title={title} /></div>
            <main className={styles.main}>{children}</main>
            <div className={styles.footer}><Footer /></div>
        </div>
    );
}
