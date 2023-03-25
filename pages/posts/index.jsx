import Router from 'next/router';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import Loding from '../../components/loading';

export default function Posts() {

    const [userId, setUserId] = useState('none');
    const [items, setItems] = useState([]);

    function onClick(_postId) {
        Router.push({
            pathname: '/discussion',
            query: {
                postId: _postId
            }
        });
    }

    useEffect(() => {

        if ('none' !== userId) {
            fetch('/api/getDiscussions/jpn/none', { method: 'GET' }).then((res) => res.json()).then((data) => setItems(data.Items))
        }

    }, [userId]);

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
                'none' !== userId && undefined !== items && 0 < items.length ?
                    (
                        <div className={styles.container}>
                            <div className={styles.timeLineView}><TimeLineView userId={userId} items={items} onClick={onClick} /></div>
                        </div>
                    ) : (
                        <div className={styles.loading}>
                            <Loding />
                        </div>
                    )
            }
        </Layout >
    );
}