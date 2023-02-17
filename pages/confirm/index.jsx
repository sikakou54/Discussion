import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '../../styles/Confirm.module.css'
import { confirm } from '../../api/auth';
import { apiFetchPost } from '../../api/utils';
import Layout from '../../components/layout';

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
                setMessage('認証エラー');
            }

        } else {
            setMessage('コードを確認してください');
        }
    }

    return (
        <Layout title={'Confirm'}>
            <form onSubmit={onSubmit} className={styles.confirmForm}>
                <input placeholder='確認コード' onChange={(event) => { setConfirmCode(event.target.value) }} type='text' required className={styles.confirmFormTextBox} />
                <input type='submit' value='Confirm' className={styles.confirmFormTButton} />
                <div>{message}</div>
            </form>ï
        </Layout>
    );
}
