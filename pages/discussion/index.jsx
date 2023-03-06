import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import Discussion from '../../components/discussion';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import Loding from '../../components/loading';
import styles from '../../styles/Discussion.module.css';
import Router, { useRouter } from 'next/router';

export default function DiscussionManager() {

    const router = useRouter();
    const { postId } = router.query;
    const [userId, setUserId] = useState('none');
    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {

        if (undefined !== postId) {
            const json = sessionStorage.getItem('talkUp');
            if (null !== json) {
                const data = JSON.parse(json);
                if ('userId' in data) {
                    setUserId(data.userId);
                    fetch('/api/getDiscussion/' + postId, { method: 'GET' }).then(response => response.json()).then((data) => {
                        if (null !== data.discussion) {
                            if (data.discussion.pub) {
                                setDiscussion(data.discussion);
                            } else {
                                Router.push({
                                    pathname: '/posts'
                                });
                            }
                        } else {
                            Router.push({
                                pathname: '/posts'
                            });
                        }
                    })
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
        }

    }, [postId]);

    return (
        <Layout title={'Discussion'}>
            {
                'none' !== userId && null !== discussion && undefined !== postId ?
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
