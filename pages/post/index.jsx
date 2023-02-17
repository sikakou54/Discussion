import { useState } from 'react';
import Router from 'next/router';
import { apiFetchPost } from '../../api/utils';
import Layout from '../../components/layout';
import Button from '../../components/button';
import style from '../../styles/Post.module.css';

export default function Post({ userId }) {

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [positiveText, setPositiveText] = useState('');
    const [negativeText, setNegativeText] = useState('');

    async function onPost() {
        apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/setDiscussion', {
            body: JSON.stringify({
                country: 'jpn',
                userId,
                title,
                detail,
                positiveText,
                negativeText
            })
        }).then(() => {
            Router.push('/posts');
        });
    }

    function onCancel() {
        Router.push('/posts');
    }

    return (
        <Layout title={'Post'}>
            <div className={style.container}>
                <div><input className={style.title} type='text' placeholder='朝食はパン？ごはん？' required onChange={(e) => { setTitle(e.target.value) }} /></div>
                {title.length > 30 && <div className={style.errorText}>30文字以内で入力してください</div>}
                {title.length === 0 && <div className={style.errorText}>タイトルを入力してください</div>}

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
                    <div className={style.buttonAreaItem}><Button onClick={onCancel} text={'キャンセル'} /></div>
                    {
                        (title.length > 0 && title.length <= 30) &&
                            (positiveText.length > 0 && positiveText.length <= 20) &&
                            (negativeText.length > 0 && negativeText.length <= 20) &&
                            (detail.length > 0 && detail.length <= 140)
                            ? <div className={style.buttonAreaItem}><Button disable={false} onClick={onPost} text={'投稿する'} /></div>
                            : <div className={style.buttonAreaItem}><Button disable={true} onClick={onPost} text={'投稿する'} /></div>
                    }
                </div>
            </div>
        </Layout>
    );
}

//SSR
export async function getServerSideProps() {

    return {
        props: {
            userId: 'a18c3444-56c3-43c3-a34b-41263fd64d35'
        }
    }

}
