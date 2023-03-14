import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/layout';
import style from '../../styles/Post.module.css';
import Loding from '../../components/loading';
import { discussionErrorCode } from '../../define/define';

export default function Post() {

    const router = useRouter();
    const { country, postId } = router.query;
    const [userId, setUserId] = useState('none');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [positiveText, setPositiveText] = useState('');
    const [negativeText, setNegativeText] = useState('');
    const [seq, setSeq] = useState(0);
    const [loading, setLoding] = useState(false);

    function backPosts() {
        Router.push({
            pathname: '/posts'
        });
    }

    function next(e) {
        e.preventDefault();
        setSeq((seq) => seq + 1);
    }

    function preview() {
        setSeq((seq) => seq - 1);
    }

    async function onPost(e) {
        e.preventDefault();
        fetch('/api/setDiscussion', {
            method: 'POST', body: JSON.stringify({
                country,
                postId,
                userId,
                title,
                detail,
                positiveText,
                negativeText
            })
        }).then(response => response.json()).then((data) => {
            if (data.response.result) {
                Router.push({
                    pathname: '/discussion',
                    query: {
                        postId
                    }
                });
            } else {
                Router.push({
                    pathname: '/error',
                    query: {
                        code: discussionErrorCode.roomMakeError
                    }
                });
            }
        });
        setLoding(true);
    }

    function onCancel() {
        backPosts();
    }

    function onbeforeunload(event) {
        event.returnValue = 'このページを離れますか？'; // Google Chrome
    }

    useEffect(() => {

        const json = sessionStorage.getItem('talkUp');
        const data = JSON.parse(json);
        setUserId(data.userId);
        window.addEventListener('beforeunload', onbeforeunload, false);

        return () => {
            window.removeEventListener('beforeunload', onbeforeunload, false);
        };

    }, []);

    return (
        <Layout title={'Post'}>
            {
                'none' !== userId && false === loading ?
                    (
                        <div className={style.container}>
                            <div className={style.seqWrapper}>
                                {0 >= seq
                                    ? <div className={`${style.seq} ${style.disable}`}>1</div>
                                    : <div className={`${style.seq} ${style.enable}`}>1</div>
                                }
                                {1 >= seq
                                    ? <div className={`${style.seq} ${style.disable}`}>2</div>
                                    : <div className={`${style.seq} ${style.enable}`}>2</div>
                                }
                                {2 >= seq
                                    ? <div className={`${style.seq} ${style.disable}`}>3</div>
                                    : <div className={`${style.seq} ${style.enable}`}>3</div>
                                }
                            </div>
                            {
                                0 === seq &&
                                <form onSubmit={next}>
                                    <div className={style.frame}>
                                        <div className={style.secsionName}>議題</div>
                                        <div><input className={style.title} type='text' placeholder='朝食はパン？ごはん？' required onChange={(e) => { setTitle(e.target.value) }} value={title} /></div>
                                        {title.length > 30 && <div className={style.errorText}>30文字以内で入力してください</div>}
                                        {title.length === 0 && <div className={style.errorText}>議題を入力してください(30文字)</div>}
                                    </div>
                                    <div className={style.buttonArea}>
                                        <input type='button' className={style.cancel} onClick={onCancel} value='戻る' />
                                        {
                                            (title.length > 0 && title.length <= 30)
                                                ? <input type='submit' className={`${style.push} ${style.enable}`} disabled={false} onClick={next} value='次へ' />
                                                : <input type='submit' className={`${style.push} ${style.disable}`} disabled={true} onClick={next} value='次へ' />
                                        }
                                    </div>
                                </form>
                            }
                            {
                                1 === seq &&
                                <form onSubmit={next}>
                                    <div className={style.frame}>
                                        <div className={style.secsionName}>討論</div>
                                        <div><input className={style.discussion} type='text' placeholder='ぱん' required onChange={(e) => { setPositiveText(e.target.value) }} value={positiveText} /></div>
                                        {positiveText.length > 20 && <div className={style.errorText}>20文字以内で入力してください</div>}
                                        {positiveText.length === 0 && <div className={style.errorText}>討論を入力してください(20文字)</div>}
                                        <div><input className={style.discussion} type='text' placeholder='ごはん' required onChange={(e) => { setNegativeText(e.target.value) }} value={negativeText} /></div>
                                        {negativeText.length > 20 && <div className={style.errorText}>20文字以内で入力してください</div>}
                                        {negativeText.length === 0 && <div className={style.errorText}>討論を入力してください(20文字)</div>}
                                    </div>
                                    <div className={style.buttonArea}>
                                        <input type='button' className={style.cancel} onClick={preview} value='戻る' />
                                        {
                                            (positiveText.length > 0 && positiveText.length <= 20) &&
                                                (negativeText.length > 0 && negativeText.length <= 20)
                                                ? <input type='submit' className={`${style.push} ${style.enable}`} disabled={false} onClick={next} value='次へ' />
                                                : <input type='submit' className={`${style.push} ${style.disable}`} disabled={true} onClick={next} value='次へ' />
                                        }
                                    </div>
                                </form>
                            }
                            {
                                2 === seq &&
                                <form onSubmit={next}>
                                    <div className={style.frame}>
                                        <div className={style.secsionName}>概要</div>
                                        <textarea className={style.oval} placeholder='朝食の最適解について討論しましょう！' required onChange={(e) => { setDetail(e.target.value) }} defaultValue={detail} />
                                        {detail.length > 140 && <div className={style.errorText}>140文字以内で入力してください</div>}
                                        {detail.length === 0 && <div className={style.errorText}>概要を入力してください(140文字)</div>}
                                    </div>
                                    <div className={style.buttonArea}>
                                        <input type='button' className={style.cancel} onClick={preview} value='戻る' />
                                        {
                                            (detail.length > 0 && detail.length <= 140)
                                                ? <input type='submit' className={`${style.push} ${style.enable}`} disabled={false} onClick={next} value='次へ' />
                                                : <input type='submit' className={`${style.push} ${style.disable}`} disabled={true} onClick={next} value='次へ' />
                                        }
                                    </div>
                                </form>
                            }
                            {
                                3 === seq &&
                                <form onSubmit={onPost}>
                                    <div className={style.frame} onClick={() => setSeq(0)}>
                                        <div className={style.secsionName}>議題</div>
                                        <div className={style.title}>{title}</div>
                                    </div>
                                    <div className={style.frame} onClick={() => setSeq(1)}>
                                        <div className={style.secsionName}>討論</div>
                                        <div className={style.discussion}>{positiveText}</div>
                                        <div className={style.discussion}>{negativeText}</div>
                                    </div>
                                    <div className={style.frame} onClick={() => setSeq(2)}>
                                        <div className={style.secsionName}>概要</div>
                                        <div className={style.oval}>{detail}</div>
                                    </div>
                                    <div className={style.buttonArea}>
                                        <input type='button' className={style.cancel} onClick={preview} value='戻る' />
                                        <input type='submit' className={`${style.push} ${style.enable}`} disabled={false} value='完了' />
                                    </div>
                                </form>
                            }
                        </div>
                    ) : (
                        <div className={style.loading}>
                            <Loding />
                        </div>
                    )
            }
        </Layout>
    );
}
