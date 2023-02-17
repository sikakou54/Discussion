import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/SignIn.module.css';
import { signIn } from '../../api/auth';
import { setCookie } from 'nookies';
import Layout from '../../components/layout';

export default function SignIn() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function onSubmit(event) {

        event.preventDefault();

        const user = await signIn(userName, password);

        if (undefined !== user) {

            setCookie(null, 'jwt', user.signInUserSession.idToken.jwtToken, {
                maxAge: 30 * 24 * 60 * 60,
            });

            console.log(user.signInUserSession.idToken.jwtToken);

            Router.push('/posts');

        } else {
            setMessage('ユーザー名/パスワードを確認してください');
        }
    }

    return (
        <Layout title={'SignIn'}>
            <form onSubmit={onSubmit} className={styles.loginForm}>
                <input placeholder='UserName' onChange={(event) => { setUserName(event.target.value) }} type='text' required className={styles.loginFormTextBox} />
                <input placeholder='Password' onChange={(event) => { setPassword(event.target.value) }} type='password' required className={styles.loginFormTextBox} />
                <input type='submit' value='SignIn' className={styles.loginFormTButton} />
                <div><Link href={'/signUp'} ><a className={styles.loginFormSignUpLink} >SignUp</a></Link></div>
                <div>{message}</div>
            </form>
        </Layout>
    );
}
