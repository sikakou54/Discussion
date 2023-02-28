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

export default function DiscussionManager({ postId, userId }) {

    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {

        apiFetchGet('/api/getDiscussion/' + postId).then((response) => {
            console.log(response);
            if (200 == response.statusCode) {
                setDiscussion(response.data.discussion);
            }
        });

    }, []);

    if (null !== discussion) {

        return (
            <Layout title={'Discussion'}>
                < ThemeProvider theme={lightTheme} >
                    <MeetingProvider>
                        <Discussion discussion={discussion} userId={userId} />
                    </MeetingProvider>
                </ThemeProvider >
            </Layout>
        );

    } else {
        return (
            <Layout title={'Discussion'}>
                <div className={styles.loading}>
                    <Loding />
                </div>
            </Layout>
        );
    }

}

//SSR
export async function getServerSideProps(context) {

    const { userId, postId } = context.query;
    return {
        props: {
            userId,
            postId
        }
    }
}