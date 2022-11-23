import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import { confirm } from '../../api/auth';
import { apiFetchPost } from '../../api/api';

export default function Confirm() {

    const [confirmCode, setConfirmCode] = useState("");
    const [message, setMessage] = useState('');

    const router = useRouter();
    const userName = router.query.userName;
    const userId = router.query.userId;

    useEffect(() => { }, []);

    async function onSubmit(event) {

        event.preventDefault();

        const result = confirm(userName, confirmCode);

        if (undefined !== result) {

            const result = await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + "/setUser", {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    name: userName
                })
            });

            if (result.status) {
                Router.push('/signIn');
            } else {
                setMessage('認証エラー、リトライすると成功する可能性があります。');
            }

        } else {
            setMessage('認証エラー、コードを確認してください');
        }
    }

    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <div><label>Confirm:</label><input onChange={(event) => { setConfirmCode(event.target.value) }} type="test" /></div>
                <div><input type="submit" value="Confirm" /></div>
                <div>{message}</div>
            </form>
        </main>
    );
}
