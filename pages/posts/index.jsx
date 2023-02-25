import Router from 'next/router';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import Loding from '../../components/loading';

export default function Posts({ userId }) {

    const [lastEvaluatedKey, setLastEvaluatedKey] = useState({
        country: 'jpn',
        postId: 'none'
    });
    const [lastEvaluatedKeys, setLastEvaluatedKeys] = useState([]);

    const [items, setItems] = useState([]);
    const [timerId, setTimerId] = useState(undefined);
    const [timerCount, setTimerCount] = useState(0);

    function onClick(_postId) {
        Router.push({
            pathname: 'discussion',
            query: {
                postId: _postId,
                userId
            }
        });
    }

    function onClickNext() {
        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + lastEvaluatedKeys[lastEvaluatedKeys.length - 1].country + '/' + lastEvaluatedKeys[lastEvaluatedKeys.length - 1].postId)
            .then((response) => {
                if (0 < response.data.Count) {
                    setItems(response.data.Items);
                    if (-1 !== Object.keys(response.data).indexOf('LastEvaluatedKey')) {
                        setLastEvaluatedKey(response.data.LastEvaluatedKey);
                    }
                }
            });
    }

    function onClickPreview() {

        if (0 <= lastEvaluatedKeys.length - 3) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + lastEvaluatedKeys[lastEvaluatedKeys.length - 3].country + '/' + lastEvaluatedKeys[lastEvaluatedKeys.length - 3].postId)
                .then((response) => {
                    setItems(response.data.Items);
                });
            const newItems = [...lastEvaluatedKeys];
            newItems.pop();
            setLastEvaluatedKeys(newItems);
        }

    }

    useEffect(() => {
        console.log('timerCount', timerCount);
        if (0 <= lastEvaluatedKeys.length - 2) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + lastEvaluatedKeys[lastEvaluatedKeys.length - 2].country + '/' + lastEvaluatedKeys[lastEvaluatedKeys.length - 2].postId)
                .then((response) => {
                    if (0 < response.data.Count) {
                        setItems(response.data.Items);
                    }
                });
        }
    }, [timerCount]);

    useEffect(() => {
        console.log('lastEvaluatedKey', lastEvaluatedKey);
        setLastEvaluatedKeys([...lastEvaluatedKeys, lastEvaluatedKey]);
    }, [lastEvaluatedKey]);

    useEffect(() => {
        console.log('lastEvaluatedKeys', lastEvaluatedKeys);
    }, [lastEvaluatedKeys]);

    useEffect(() => {

        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + lastEvaluatedKey.country + '/' + lastEvaluatedKey.postId)
            .then((response) => {
                setItems(response.data.Items);
                if (-1 !== Object.keys(response.data).indexOf('LastEvaluatedKey')) {
                    setLastEvaluatedKey(response.data.LastEvaluatedKey);
                }
            });

        const tId = setInterval(() => {
            if (100 >= timerCount) {
                setTimerCount((timerCount) => timerCount + 1);
            } else {
                setTimerCount(0);
            }
        }, 1000);
        setTimerId(tId);

        return () => {
            clearInterval(timerId);
        }

    }, []);

    return (
        <Layout title={'Posts'} >
            {
                0 < items.length ?
                    (
                        <div className={styles.container}>
                            <div className={styles.pageControl}>
                                <button className={styles.preview} onClick={onClickPreview}>＜</button>
                                <button className={styles.next} onClick={onClickNext}>＞</button>
                            </div>
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


//SSR
export async function getServerSideProps(context) {

    const { userId } = context.query;

    return {
        props: {
            userId
        }
    };
}