import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import Discussion from '../../components/discussion';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default function DiscussionManager({ postId, userId }) {

    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {

        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussion/' + 'jpn' + '/' + postId).then((response) => {
            if (200 == response.statusCode) {
                setDiscussion(response.data);
            } else {
                Router.push({
                    pathname: 'posts'
                });
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
                <></>
            </Layout>
        );
    }

}

//SSR
export async function getServerSideProps(context) {

    const { postId, userId } = context.query;

    return {
        props: {
            postId,
            userId
        }
    };
}