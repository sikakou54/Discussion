import { useState } from 'react';
import Router from 'next/router';
import { apiFetchPost } from '../../api/utils';
import { jwtVerify } from '../../api/auth';
import { parseCookies } from 'nookies';
import Layout from '../../components/layout';
import Button from '../../components/button';
import style from '../../styles/Post.module.css';

export default function Post({ userId }) {

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [positiveText, setPositiveText] = useState('');
    const [negativeText, setNegativeText] = useState('');

    async function onPost() {

        if ('' !== title && '' !== detail && '' !== positiveText && '' !== negativeText) {

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
    }

    function onCancel() {
        Router.push('/posts');
    }

    return (
        <Layout userId={userId} title={'Post'}>
            <div className={style.container}>
                <div><input className={style.title} type='text' placeholder='タイトル' required onChange={(e) => { setTitle(e.target.value) }} /></div>
                <div className={style.frame}>
                    <div className={style.secsionName}>討論</div>
                    <div><input className={style.discussion} type='text' placeholder='1' required onChange={(e) => { setPositiveText(e.target.value) }} /></div>
                    <div><input className={style.discussion} type='text' placeholder='2' required onChange={(e) => { setNegativeText(e.target.value) }} /></div>
                </div>
                <div className={style.frame}>
                    <div className={style.secsionName}>概要</div>
                    <textarea className={style.oval} id="story" name="story" rows="5" cols="33" required onChange={(e) => { setDetail(e.target.value) }} />
                </div>
                <div className={style.buttonArea}>
                    <div className={style.buttonAreaItem}><Button onClick={onCancel} text={'キャンセル'} /></div>
                    <div className={style.buttonAreaItem}><Button onClick={onPost} text={'投稿する'} /></div>
                </div>
            </div>
        </Layout>
    );
}

//SSR
export async function getServerSideProps(ctx) {

    const cookie = parseCookies(ctx);

    if (-1 !== Object.keys(cookie).indexOf('jwt')) {

        const { sub } = await jwtVerify(cookie.jwt);

        return {
            props: {
                userId: sub
            }
        }

    } else {

        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }
}
