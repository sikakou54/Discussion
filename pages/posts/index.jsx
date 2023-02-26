import Router, { useRouter } from 'next/router';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import Loding from '../../components/loading';

export default function Posts() {

    const router = useRouter();
    const { userId, country, postId } = router.query;
    const [items, setItems] = useState([]);
    const [timerId, setTimerId] = useState(undefined);
    const [timerCount, setTimerCount] = useState(0);

    function onClick(_postId) {
        Router.push({
            pathname: '/discussion',
            query: {
                postId: _postId,
                userId
            }
        });
    }

    async function getItems(_country, _postId, _items) {

        if (undefined === _country && undefined === _postId) {
            return _items;
        }
        const response = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + _country + '/' + _postId);
        if (response.result) {
            if (-1 !== Object.keys(response.data).indexOf('LastEvaluatedKey')) {
                return getItems(response.data.LastEvaluatedKey.country, response.data.LastEvaluatedKey.postId, [..._items, ...(response.data.Items)]);
            } else {
                return getItems(undefined, undefined, [..._items, ...(response.data.Items)]);
            }
        } else {
            return getItems(undefined, undefined, []);
        }
    }

    useEffect(async () => {
        let items = [];
        const newItems = await getItems(country, postId, items);
        if (0 !== newItems.length) {
            setItems(newItems);
        }
    }, [timerCount]);

    useEffect(async () => {

        return () => {
            clearInterval(timerId);
        }

    }, []);

    useEffect(async () => {

        if (undefined !== country && undefined !== postId) {
            const tId = setInterval(() => {
                setTimerCount((timerCount) => {
                    if (100 >= timerCount) {
                        return timerCount + 1
                    } else {
                        return 0
                    }
                });
            }, 3000);
            setTimerId(tId);
        }

    }, [country, postId]);

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