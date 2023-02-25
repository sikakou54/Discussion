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
    const [items, setItems] = useState([]);
    const bodyElement = useRef(null);
    const windowElement = useRef(null);

    function onClick(_postId) {
        Router.push({
            pathname: 'discussion',
            query: {
                postId: _postId,
                userId
            }
        });
    }

    function scroollEventListener() {
        setScrollBottomPosition(bodyElement.current.offsetHeight - (windowElement.current.scrollY + windowElement.current.innerHeight));
    }

    useEffect(() => {
        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussions/' + lastEvaluatedKey.country + '/' + lastEvaluatedKey.postId).then((response) => {
            setItems((items) => [...items, ...(response.data.Items)]);
            if (-1 !== Object.keys(response.data).indexOf('LastEvaluatedKey')) {
                setLastEvaluatedKey(response.data.LastEvaluatedKey);
            }
        });
    }, [lastEvaluatedKey]);

    useEffect(() => {

        bodyElement.current = document.body;
        windowElement.current = window;
        windowElement.current.onscroll = scroollEventListener;

        return () => {
            windowElement.current.onscroll = null;
        }

    }, []);

    return (
        <Layout title={'Posts'} >
            {
                0 < items.length ?
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


//SSR
export async function getServerSideProps(context) {

    const { userId } = context.query;

    return {
        props: {
            userId
        }
    };
}