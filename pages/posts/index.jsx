import Router from 'next/router';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import Loding from '../../components/loading';
import useSWR from 'swr';

export default function Posts() {

    const [userId, setUserId] = useState('none');
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const [items, setItems] = useState([]);
    const { data, error } = useSWR('/api/getDiscussions/jpn/none', fetcher, {
        refreshInterval: 1000
    });

    function onClick(_postId) {
        Router.push({
            pathname: '/discussion',
            query: {
                postId: _postId
            }
        });
    }

    useEffect(() => {

        if (undefined !== data) {
            setItems(data.Items);
        }

    }, [data]);

    useEffect(() => {

        if (undefined !== error) {
            console.error('posts', error);
        }

    }, [error]);

    useEffect(() => {

        const json = sessionStorage.getItem('talkUp');
        if (null !== json) {
            const data = JSON.parse(json);
            if ('userId' in data) {
                setUserId(data.userId);
            } else {
                Router.push({
                    pathname: '/'
                });
                return;
            }
        } else {
            Router.push({
                pathname: '/'
            });
            return;
        }

        return () => { }

    }, []);

    return (
        <Layout title={'Posts'} >
            {
                'none' !== userId ?
                    (
                        undefined !== items && 0 < items.length ?
                            (
                                <div className={styles.container}>
                                    <div className={styles.timeLineView}><TimeLineView userId={userId} items={items} onClick={onClick} /></div>
                                </div>
                            ) : (
                                <div className={styles.loading}>
                                    <Loding />
                                </div>
                            )
                    ) : (
                        <></>
                    )
            }
        </Layout >
    );
}