import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import Loding from '../../components/loading';
import styles from '../../styles/Info.module.css';

export default function Info() {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [detail, setDetail] = useState('');
    const [seq, setSeq] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(e) {
        e.preventDefault();
        if (3 === seq) {
            fetch('/api/pushInfomation', {
                method: 'POST', body: JSON.stringify({
                    name,
                    mail,
                    detail,
                    country: 'jpn'
                })
            }).then((response) => response.json()).then((data) => {
                if (data.response.result) {
                    next();
                    setIsLoading(false);
                }
            }).catch((e) => console.log(e));
            setIsLoading(true);
        } else {
            next();
        }
    }

    function onCancel() {
        Router.push({
            pathname: '/'
        });
    }

    function next() {
        setSeq((seq) => seq + 1);
    }

    function preview() {
        setSeq((seq) => seq - 1);
    }

    function onbeforeunload(event) {
        event.returnValue = 'このページを離れますか？';
    }

    useEffect(() => {

        window.addEventListener('beforeunload', onbeforeunload, false);

        return () => {
            window.removeEventListener('beforeunload', onbeforeunload, false);
        };

    }, []);

    return (
        <Layout title={'お問い合わせ'}>
            <div className={styles.container}>
                {
                    false === isLoading ?
                        (
                            <>
                                {
                                    4 !== seq &&
                                    (
                                        <>
                                            <div className={styles.seqWrapper}>
                                                {0 >= seq
                                                    ? <div className={`${styles.seq} ${styles.disable}`}>1</div>
                                                    : <div className={`${styles.seq} ${styles.enable}`}>1</div>
                                                }
                                                {1 >= seq
                                                    ? <div className={`${styles.seq} ${styles.disable}`}>2</div>
                                                    : <div className={`${styles.seq} ${styles.enable}`}>2</div>
                                                }
                                                {2 >= seq
                                                    ? <div className={`${styles.seq} ${styles.disable}`}>3</div>
                                                    : <div className={`${styles.seq} ${styles.enable}`}>3</div>
                                                }
                                            </div>
                                            <div className={styles.top}>お問い合わせ</div>
                                        </>
                                    )
                                }
                                <form onSubmit={onSubmit}>
                                    {
                                        0 === seq &&
                                        (
                                            <div className={styles.secssion}>
                                                <div className={styles.secsionName}>お名前</div>
                                                <div>
                                                    <input
                                                        className={styles.mail}
                                                        type='text'
                                                        placeholder='お名前を入力してください'
                                                        onChange={(e) => { setName(e.target.value) }}
                                                        value={name}
                                                        required />
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        1 === seq &&
                                        (
                                            <div className={styles.secssion}>
                                                <div className={styles.secsionName}>メールアドレス</div>
                                                <div><input
                                                    className={styles.mail}
                                                    type='email'
                                                    placeholder='メールアドレスを入力してください'
                                                    onChange={(e) => { setMail(e.target.value) }}
                                                    value={mail}
                                                    required />
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        2 === seq &&
                                        (
                                            <div className={styles.secssion}>
                                                <div className={styles.secsionName}>お問い合わせ内容</div>
                                                <textarea
                                                    className={styles.detail}
                                                    placeholder='お問い合わせ内容を入力してください'
                                                    onChange={(e) => { setDetail(e.target.value) }}
                                                    defaultValue={detail}
                                                    required />
                                            </div>
                                        )
                                    }
                                    {
                                        3 === seq &&
                                        (
                                            <>
                                                <div className={styles.secssion} onClick={() => setSeq(0)}>
                                                    <div className={styles.secsionName}>お名前</div>
                                                    <div className={styles.name}>{name}</div>
                                                </div>
                                                <div className={styles.secssion} onClick={() => setSeq(1)}>
                                                    <div className={styles.secsionName}>メールアドレス</div>
                                                    <div className={styles.mail}>{mail}</div>
                                                </div>
                                                <div className={styles.secssion} onClick={() => setSeq(2)}>
                                                    <div className={styles.secsionName}>お問い合わせ内容</div>
                                                    <textarea
                                                        className={styles.detail}
                                                        defaultValue={detail}
                                                        readOnly={true} />
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        4 === seq ?
                                            (
                                                <>
                                                    <div className={styles.comlete}>お問い合わせありがとうございます</div>
                                                    <div className={styles.buttonArea}>
                                                        <input type='button' className={styles.cancel} onClick={onCancel} value='戻る' />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className={styles.buttonArea}>
                                                    {
                                                        0 === seq ?
                                                            (
                                                                <input type='button' className={styles.cancel} onClick={onCancel} value='戻る' />
                                                            ) :
                                                            (
                                                                <input type='button' className={styles.cancel} onClick={preview} value='戻る' />
                                                            )
                                                    }
                                                    {
                                                        3 === seq ?
                                                            (
                                                                <input type='submit' className={`${styles.push} `} value='完了' />
                                                            ) : (
                                                                <input type='submit' className={`${styles.push} `} value='次へ' />
                                                            )
                                                    }
                                                </div>
                                            )
                                    }
                                </form>
                            </>
                        ) : (
                            <div className={styles.loading}>
                                <Loding />
                            </div>
                        )
                }
            </div>
        </Layout>
    );
}














