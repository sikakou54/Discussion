import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import Discussion from '../../components/discussion';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';

export default function DiscussionManager({ userId, discussion }) {

    return (
        <Layout title={'Discussion'}>
            < ThemeProvider theme={lightTheme} >
                <MeetingProvider>
                    <Discussion discussion={discussion} userId={userId} />
                </MeetingProvider>
            </ThemeProvider >
        </Layout>
    );
}

//SSR
export async function getServerSideProps(context) {

    const { postId } = context.query;
    const response = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussion/' + 'jpn' + '/' + postId);

    if (200 == response.statusCode) {

        return {
            props: {
                userId: 'a18c3444-56c3-43c3-a34b-41263fd64d35',
                discussion: response.data
            }
        };

    } else {

        return {
            redirect: {
                permanent: false,
                destination: '/posts',
            },
        };
    }
}