import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import Discussion from '../../components/discussion';
import { parseCookies } from 'nookies';
import { jwtVerify } from '../../api/auth';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';

export default function DiscussionManager({ discussion, userId }) {

    return (
        <Layout userId={userId} title={'Discussion'}>
            < ThemeProvider theme={lightTheme} >
                <MeetingProvider>
                    <Discussion discussion={discussion} userId={userId} />
                </MeetingProvider>
            </ThemeProvider >
        </Layout>
    );
}

//SSR
export async function getServerSideProps(ctx) {

    const { postId } = ctx.query;
    const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussion/' + 'jpn' + '/' + postId, {
        headers: {
            Authorization: process.env.jwt
        }
    });

    if (res.result) {

        const { sub } = await jwtVerify(process.env.jwt);

        return {
            props: {
                discussion: res.data,
                userId: sub
            }
        };

    } else {

        return {
            redirect: {
                destination: '/posts',
                permanent: false
            }
        }
    }

}