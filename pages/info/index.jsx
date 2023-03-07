import Router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/layout';
import styles from '../../styles/Info.module.css';

export default function Info() {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [detail, setDetail] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        fetch('/api/pushInfomation', {
            method: 'POST', body: JSON.stringify({
                name,
                mail,
                detail
            })
        }).then((response) => response.json()).then((data) => {
            if (data.response.result) {
                Router.push({
                    pathname: '/'
                });
            }
        }).catch((e) => console.log(e));
    }

    function onCancel() {
        Router.push({
            pathname: '/'
        });
    }

    return (
        <Layout title={'お問い合わせ'}>
            <div className={styles.container}>
                <div className={styles.top}>お問い合わせ</div>

                <form onSubmit={onSubmit}>

                    <div className={styles.secssion}>
                        <div className={styles.secsionName}>お名前</div>
                        <div><input className={styles.mail} type='text' placeholder='お名前を入力してください' required onChange={(e) => { setName(e.target.value) }} value={name} /></div>
                    </div>

                    <div className={styles.secssion}>
                        <div className={styles.secsionName}>メールアドレス</div>
                        <div><input className={styles.mail} type='email' placeholder='メールアドレスを入力してください' required onChange={(e) => { setMail(e.target.value) }} value={mail} /></div>
                    </div>

                    <div className={styles.secssion}>
                        <div className={styles.secsionName}>お問い合わせ内容</div>
                        <textarea className={styles.detail} placeholder='お問い合わせ内容を入力してください' required onChange={(e) => { setDetail(e.target.value) }} defaultValue={detail} />
                    </div>

                    <div className={styles.buttonArea}>
                        <input type='button' className={styles.cancel} onClick={onCancel} value='戻る' />
                        <input type='submit' className={`${styles.push} `} disabled={false} value='完了' />
                    </div>
                </form>
            </div>
        </Layout>
    );
}














