import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import { confirm } from '../../api/auth';
import { apiFetchPost } from '../../api/utils';
import Header from '../../components/header';

export default function Confirm() {

    const [confirmCode, setConfirmCode] = useState('');
    const [message, setMessage] = useState('確認コードを送信しました');
    const router = useRouter();
    const { userName, userId } = router.query;

    async function onSubmit(event) {

        event.preventDefault();

        if (undefined !== await confirm(userName, confirmCode)) {

            const res = await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/setUser', {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    name: userName
                })
            });

            if (res.result) {
                Router.push('/signIn');
            } else {
                setMessage('認証エラー、リトライすると成功する可能性があります。');
            }

        } else {
            setMessage('認証エラー、コードを確認してください');
        }
    }

    return (
        <div>
            <Header userId={undefined} />
            <main className={styles.main}>
                <form onSubmit={onSubmit}>
                    <div><label>Confirm:</label><input onChange={(event) => { setConfirmCode(event.target.value) }} type='test' required /></div>
                    <div><input type='submit' value='Confirm' /></div>
                    <div>{message}</div>
                </form>
            </main>
        </div>

    );
}
