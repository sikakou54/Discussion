import Router from 'next/router';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import Loding from '../../components/loading';
import useSWR from 'swr';

export default function Posts({ userId, country, postId }) {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const [items, setItems] = useState([]);
    const { data, error } = useSWR('/api/getDiscussions/' + country + '/' + postId, fetcher, {
        refreshInterval: 1000
    });

    function onClick(_postId) {
        Router.push({
            pathname: '/discussion',
            query: {
                postId: _postId,
                userId
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
        return () => { }
    }, []);

    return (
        <Layout title={'Posts'} >
            {
                undefined !== items && 0 < items.length ?
                    (
                        <div className={styles.container}>
                            <div className={styles.timeLineView}><TimeLineView country={country} postId={postId} userId={userId} items={items} onClick={onClick} /></div>
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

//SSR
export async function getServerSideProps(context) {

    const { userId, country, postId } = context.query;
    return {
        props: {
            userId,
            country,
            postId
        }
    }
}