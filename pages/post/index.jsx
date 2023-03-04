import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { apiFetchPost } from '../../api/utils';
import Layout from '../../components/layout';
import style from '../../styles/Post.module.css';

export default function Post() {

    const router = useRouter();
    const { userId, country, postId } = router.query;
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [positiveText, setPositiveText] = useState('');
    const [negativeText, setNegativeText] = useState('');
    const [seq, setSeq] = useState(0);

    function backPosts() {
        Router.push({
            pathname: '/posts',
            query: {
                userId,
                country: 'jpn',
                postId: 'none'
            }
        });
    }

    function next() {
        setSeq((seq) => seq + 1);
    }


    function preview() {
        setSeq((seq) => seq - 1);
    }

    async function onPost() {
        apiFetchPost('/api/setDiscussion', {
            country,
            postId,
            userId,
            title,
            detail,
            positiveText,
            negativeText
        }).then(() => {
            Router.push({
                pathname: '/discussion',
                query: {
                    postId,
                    userId
                }
            });
        });
    }

    function onCancel() {
        backPosts();
    }

    return (
        <Layout title={'Post'}>
            <div className={style.container}>
                {
                    0 === seq &&
                    <>
                        <div className={style.frame}>
                            <div className={style.secsionName}>議題</div>
                            <div><input className={style.title} type='text' placeholder='朝食はパン？ごはん？' required onChange={(e) => { setTitle(e.target.value) }} value={title} /></div>
                            {title.length > 30 && <div className={style.errorText}>30文字以内で入力してください</div>}
                            {title.length === 0 && <div className={style.errorText}>タイトルを入力してください</div>}
                        </div>
                        <div className={style.buttonArea}>
                            <button className={style.cancel} onClick={onCancel}> 戻る</button>
                            {
                                (title.length > 0 && title.length <= 30)
                                    ? <button className={`${style.push} ${style.enable}`} disabled={false} onClick={next} >次へ</button>
                                    : <button className={`${style.push} ${style.disable}`} disabled={true} onClick={next} >次へ</button>
                            }
                        </div>
                    </>

                }
                {
                    1 === seq &&
                    <>
                        <div className={style.frame}>
                            <div className={style.secsionName}>討論</div>
                            <div><input className={style.discussion} type='text' placeholder='ぱん' required onChange={(e) => { setPositiveText(e.target.value) }} value={positiveText} /></div>
                            {positiveText.length > 20 && <div className={style.errorText}>20文字以内で入力してください</div>}
                            {positiveText.length === 0 && <div className={style.errorText}>討論を入力してください</div>}
                            <div><input className={style.discussion} type='text' placeholder='ごはん' required onChange={(e) => { setNegativeText(e.target.value) }} value={negativeText} /></div>
                            {negativeText.length > 20 && <div className={style.errorText}>20文字以内で入力してください</div>}
                            {negativeText.length === 0 && <div className={style.errorText}>討論を入力してください</div>}
                        </div>
                        <div className={style.buttonArea}>
                            <button className={style.cancel} onClick={preview}>戻る</button>
                            {
                                (positiveText.length > 0 && positiveText.length <= 20) &&
                                    (negativeText.length > 0 && negativeText.length <= 20)
                                    ? <button className={`${style.push} ${style.enable}`} disabled={false} onClick={next} >次へ</button>
                                    : <button className={`${style.push} ${style.disable}`} disabled={true} onClick={next} >次へ</button>
                            }
                        </div>
                    </>
                }
                {
                    2 === seq &&
                    <>
                        <div className={style.frame}>
                            <div className={style.secsionName}>概要</div>
                            <textarea className={style.oval} id="story" name="story" rows="5" cols="33" placeholder='朝食の最適解について討論しましょう！' required onChange={(e) => { setDetail(e.target.value) }} value={detail} />
                            {detail.length > 140 && <div className={style.errorText}>140文字以内で入力してください</div>}
                            {detail.length === 0 && <div className={style.errorText}>概要を入力してください</div>}
                        </div>
                        <div className={style.buttonArea}>
                            <button className={style.cancel} onClick={preview}>戻る</button>
                            {
                                (detail.length > 0 && detail.length <= 140)
                                    ? <button className={`${style.push} ${style.enable}`} disabled={false} onClick={next} >次へ</button>
                                    : <button className={`${style.push} ${style.disable}`} disabled={true} onClick={next} >次へ</button>
                            }
                        </div>
                    </>
                }
                {
                    3 === seq &&
                    <>
                        <div className={style.frame}>
                            <div className={style.secsionName}>議題</div>
                            <div className={style.title}>{title}</div>
                        </div>
                        <div className={style.frame}>
                            <div className={style.secsionName}>討論</div>
                            <div className={style.discussion}>{positiveText}</div>
                            <div className={style.discussion}>{negativeText}</div>
                        </div>
                        <div className={style.frame}>
                            <div className={style.secsionName}>概要</div>
                            <div className={style.detail}>{detail}</div>
                        </div>
                        <div className={style.buttonArea}>
                            <button className={style.cancel} onClick={preview}>戻る</button>
                            {
                                (detail.length > 0 && detail.length <= 140)
                                    ? <button className={`${style.push} ${style.enable}`} disabled={false} onClick={onPost} >完了</button>
                                    : <button className={`${style.push} ${style.disable}`} disabled={true} onClick={onPost} >完了</button>
                            }
                        </div>
                    </>
                }

            </div>
        </Layout>
    );
}
