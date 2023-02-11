import Image from 'next/image';
import Router from 'next/router';
import styles from '../styles/PostButton.module.css';
import post from '../public/post.svg';

export default function PostButton() {
    return (
        <button className={styles.container} onClick={() => Router.push('/post')}><Image src={post} className={styles.image} /></button>
    );
}
