import Footer from './footer';
import Header from './header';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title }) {

    return (
        <div className={styles.container}>
            <Header title={title} />
            <div className={styles.main}>{children}</div>
            <div className={styles.footer}><Footer /></div>
        </div>
    );
}
