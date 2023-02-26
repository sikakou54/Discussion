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

    function backPosts() {
        const item = sessionStorage.getItem('key');
        const key = JSON.parse(item);
        Router.push({
            pathname: '/posts',
            query: {
                userId,
                country: key.country,
                postId: key.postId
            }
        });
    }

    async function onPost() {
        apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/setDiscussion', {
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

                <div className={style.frame}>
                    <div className={style.secsionName}>議題</div>
                    <div><input className={style.title} type='text' placeholder='朝食はパン？ごはん？' required onChange={(e) => { setTitle(e.target.value) }} /></div>
                    {title.length > 30 && <div className={style.errorText}>30文字以内で入力してください</div>}
                    {title.length === 0 && <div className={style.errorText}>タイトルを入力してください</div>}
                </div>

                <div className={style.frame}>
                    <div className={style.secsionName}>討論</div>
                    <div><input className={style.discussion} type='text' placeholder='ぱん' required onChange={(e) => { setPositiveText(e.target.value) }} /></div>
                    {positiveText.length > 20 && <div className={style.errorText}>20文字以内で入力してください</div>}
                    {positiveText.length === 0 && <div className={style.errorText}>討論を入力してください</div>}
                    <div><input className={style.discussion} type='text' placeholder='ごはん' required onChange={(e) => { setNegativeText(e.target.value) }} /></div>
                    {negativeText.length > 20 && <div className={style.errorText}>20文字以内で入力してください</div>}
                    {negativeText.length === 0 && <div className={style.errorText}>討論を入力してください</div>}
                </div>

                <div className={style.frame}>
                    <div className={style.secsionName}>概要</div>
                    <textarea className={style.oval} id="story" name="story" rows="5" cols="33" required onChange={(e) => { setDetail(e.target.value) }} />
                    {detail.length > 140 && <div className={style.errorText}>140文字以内で入力してください</div>}
                    {detail.length === 0 && <div className={style.errorText}>概要を入力してください</div>}
                </div>

                <div className={style.buttonArea}>
                    <button className={style.cancel} onClick={onCancel}>キャンセル</button>
                    {
                        (title.length > 0 && title.length <= 30) &&
                            (positiveText.length > 0 && positiveText.length <= 20) &&
                            (negativeText.length > 0 && negativeText.length <= 20) &&
                            (detail.length > 0 && detail.length <= 140)
                            ? <button className={`${style.push} ${style.enable}`} disabled={false} onClick={onPost} >投稿する</button>
                            : <button className={`${style.push} ${style.disable}`} disabled={true} onClick={onPost} >投稿する</button>
                    }
                </div>
            </div>
        </Layout>
    );
}
