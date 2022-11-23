
import { useEffect, useState } from 'react';
import Router from 'next/router';
import styles from '../../styles/Home.module.css'
import { signUp } from '../../api/auth';

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState('');

    useEffect(() => { }, []);

    async function onSubmit(event) {

        event.preventDefault();

        const result = await signUp(userName, password, email);

        if (undefined !== result) {

            Router.push({
                pathname: "confirm",
                query: {
                    userName: result.username,
                    userId: result.userId
                }
            });

        } else {
            setMessage('認証要件を満たしていません。');
        }
    }

    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <div><label>Email:</label><input onChange={(event) => { setEmail(event.target.value) }} type="emal" required /></div>
                <div><label>Password:</label><input onChange={(event) => { setPassword(event.target.value) }} type="password" required /></div>
                <div><label>UserName:</label><input onChange={(event) => { setUserName(event.target.value) }} type="text" required /></div>
                <div><input type="submit" value="SignUp" /></div>
                <div>{message}</div>
            </form>
        </main>
    );
}
