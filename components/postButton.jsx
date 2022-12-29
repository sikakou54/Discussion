import Router from 'next/router';
import styles from '../styles/PostButton.module.css';

export default function PostButton() {
    return (
        <div className={styles.container} onClick={() => Router.push('/post')}>投稿する</div>
    );
}
