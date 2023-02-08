import Image from 'next/image';
import Router from 'next/router';
import styles from '../styles/PostButton.module.css';
import post from '../public/post.svg';

export default function PostButton() {
    return (
        <div className={styles.container} onClick={() => Router.push('/post')}><Image src={post} className={styles.image} /></div>
    );
}
