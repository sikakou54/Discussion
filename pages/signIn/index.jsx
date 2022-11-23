import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/Home.module.css'
import { signIn } from '../../api/auth';
import { setCookie } from 'nookies';

export default function SignIn() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');

    useEffect(() => { }, []);

    async function onSubmit(event) {

        event.preventDefault();

        const user = await signIn(userName, password);

        if (undefined !== user) {

            setCookie(null, 'jwt', user.signInUserSession.idToken.jwtToken, {
                maxAge: 30 * 24 * 60 * 60,
            });

            Router.push({
                pathname: "posts"
            });

        } else {
            setMessage('認証エラー、ユーザー名/パスワードを確認してください。');
        }
    }

    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <div><label>UserName:</label><input onChange={(event) => { setUserName(event.target.value) }} type="text" required /></div>
                <div><label>Password:</label><input onChange={(event) => { setPassword(event.target.value) }} type="password" required /></div>
                <div><input type="submit" value="SignIn" /></div>
                <Link href={'/signUp'}>SignUp</Link>
                <div>{message}</div>
            </form>
        </main>
    );
}
