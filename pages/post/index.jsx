import { useState } from 'react';
import Router from 'next/router';
import { apiFetchPost } from '../../api/utils';
import { jwtVerify } from '../../api/auth';
import { parseCookies } from 'nookies';
import Layout from '../../components/layout';
import style from '../../styles/Posts.module.css';

export default function Post({ userId }) {

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [positiveText, setPositiveText] = useState('');
    const [negativeText, setNegativeText] = useState('');

    async function onPost() {

        await apiFetchPost(process.env.awsApiGatewayHttpApiEndPoint + '/setDiscussion', {
            body: JSON.stringify({
                country: 'jpn',
                userId,
                title,
                detail,
                positiveText,
                negativeText
            })
        });

        Router.push('/posts');
    }

    function onCancel() {
        Router.push('/posts');
    }

    return (
        <Layout userId={userId} title={'Post'}>
            <div className={style.postCotainer}>
                <div>タイトル：<input type='text' onChange={(e) => { setTitle(e.target.value) }} /></div>
                <div>詳細<input type='text' onChange={(e) => { setDetail(e.target.value) }} /></div>
                <div>意見1：<input type='text' onChange={(e) => { setPositiveText(e.target.value) }} /></div>
                <div>意見2<input type='text' onChange={(e) => { setNegativeText(e.target.value) }} /></div>
                <div>
                    <input type='button' onClick={onCancel} value={'キャンセル'} />
                    <input type='button' onClick={onPost} value={'投稿する'} />
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
