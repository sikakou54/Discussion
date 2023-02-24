import Router from 'next/router';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Posts.module.css';
import TimeLineView from '../../components/timeLineView';
import PostButton from '../../components/postButton';

export default function Posts() {

    const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
    const [items, setItems] = useState([]);
    const bodyElement = useRef(null);
    const windowElement = useRef(null);
    const [scrollBottomPosition, setScrollBottomPosition] = useState(undefined);

    function onClick(_postId) {
        Router.push({
            pathname: 'discussion',
            query: {
                postId: _postId
            }
        });
    }

    function scroollEventListener() {
        setScrollBottomPosition(bodyElement.current.offsetHeight - (windowElement.current.scrollY + windowElement.current.innerHeight));
    }

    useEffect(() => {

        bodyElement.current = document.body;
        windowElement.current = window;
        windowElement.current.onscroll = scroollEventListener;

        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + 'jpn' + '/none/none').then((response) => {
            setItems(response.data.Items);
            if (-1 !== Object.keys(response.data).indexOf('LastEvaluatedKey')) {
                setLastEvaluatedKey(response.data.LastEvaluatedKey);
            }
        });

        return () => {
            windowElement.current.onscroll = null;
        }

    }, []);

    useEffect(() => {

        if (undefined !== scrollBottomPosition) {

            if (1 >= scrollBottomPosition) {

                if (null !== lastEvaluatedKey) {

                    apiFetchGet('/getDiscussions/' + lastEvaluatedKey.country + '/' + lastEvaluatedKey.createAt + '/' + lastEvaluatedKey.postId)
                        .then((res) => {

                            if (res.result) {

                                let newItems = [];

                                for (let i = 0; i < res.data.Items.length; i++) {

                                    if (undefined === items.find((v) => v.postId === res.data.Items[i].postId)) {
                                        newItems.push(res.data.Items[i]);
                                    }
                                }

                                if (-1 !== Object.keys(res.data).indexOf('LastEvaluatedKey')) {
                                    if (res.data.LastEvaluatedKey.country !== lastEvaluatedKey.country ||
                                        res.data.LastEvaluatedKey.createAt !== lastEvaluatedKey.createAt ||
                                        res.data.LastEvaluatedKey.postId !== lastEvaluatedKey.postId) {
                                        setLastEvaluatedKey(res.data.LastEvaluatedKey);
                                    }
                                }

                                setItems((items) => [...items, ...newItems]);
                            }
                        });
                }
            }
        }

    }, [scrollBottomPosition]);

    return (
        <Layout title={'Posts'} >
            <div className={styles.container}>
                <div className={styles.timeLineView}><TimeLineView items={items} onClick={onClick} /></div>
                <div className={styles.post}><PostButton /></div>
            </div>
        </Layout >
    );
}
