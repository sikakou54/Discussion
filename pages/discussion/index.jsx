import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import Discussion from '../../components/discussion';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import Loding from '../../components/loading';
import styles from '../../styles/Discussion.module.css';
import Router from 'next/router';

export default function DiscussionManager({ postId }) {

    const [userId, setUserId] = useState('none');
    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {

        const json = sessionStorage.getItem('talkUp');
        if (null !== json) {
            const data = JSON.parse(json);
            if ('userId' in data) {
                setUserId(data.userId);
                apiFetchGet('/api/getDiscussion/' + postId).then((response) => {
                    if (200 == response.statusCode && response.data.discussion.pub) {
                        setDiscussion(response.data.discussion);
                    } else {
                        Router.push({
                            pathname: '/posts'
                        });
                    }
                });

            } else {
                Router.push({
                    pathname: '/'
                });
            }

        } else {
            Router.push({
                pathname: '/'
            });
        }

    }, []);

    return (
        <Layout title={'Discussion'}>
            {
                'none' !== userId && null !== discussion ?
                    (
                        < ThemeProvider theme={lightTheme} >
                            <MeetingProvider>
                                <Discussion discussion={discussion} userId={userId} />
                            </MeetingProvider>
                        </ThemeProvider >
                    ) : (
                        <div className={styles.loading}>
                            <Loding />
                        </div>
                    )
            }

        </Layout>
    );
}

//SSR
export async function getServerSideProps(context) {

    const { postId } = context.query;
    return {
        props: {
            postId
        }
    }
}