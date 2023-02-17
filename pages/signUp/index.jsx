
import { useState } from 'react';
import Router from 'next/router';
import styles from '../../styles/SignUp.module.css'
import { signUp } from '../../api/auth';
import Layout from '../../components/layout';

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');

    async function onSubmit(event) {

        event.preventDefault();

        const result = await signUp(userName, password, email);

        if (undefined !== result) {

            Router.push({
                pathname: '/confirm',
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
        <Layout title={'SignUp'}>
            <form onSubmit={onSubmit} className={styles.signUpForm}>
                <input placeholder='Email' onChange={(event) => { setEmail(event.target.value) }} type='text' required className={styles.signUpFormTextBox} />
                <input placeholder='UserName' onChange={(event) => { setUserName(event.target.value) }} type='text' required className={styles.signUpFormTextBox} />
                <input placeholder='Password' onChange={(event) => { setPassword(event.target.value) }} type='password' required className={styles.signUpFormTextBox} />
                <input type='submit' value='SignUp' className={styles.signUpFormTButton} />
                <div>{message}</div>
            </form>
        </Layout>
    );
}
