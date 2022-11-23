import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from "styled-components";
import Discussion from '../../components/discussion';
import { parseCookies } from 'nookies';
import { jwtVerify } from '../../api/auth';
import { apiFetchGet } from '../../api/api';

export default function DiscussionManager({ discussion, userId }) {
    return (
        < ThemeProvider theme={lightTheme} >
            <MeetingProvider>
                <Discussion discussion={discussion} userId={userId} />
            </MeetingProvider>
        </ThemeProvider >
    );
}

//SSR
export async function getServerSideProps(ctx) {

    const { postId } = ctx.query;
    const cookie = parseCookies(ctx);

    const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussion/" + 'jpn' + '/' + postId, {
        method: 'GET', headers: {
            Authorization: cookie.jwt
        }
    });

    if (res.status) {

        const verify = await jwtVerify(cookie.jwt);

        return {
            props: {
                discussion: res.data,
                userId: verify.sub
            }
        };

    } else if (401 === res.statusCode) {

        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }

    } else {

        return {
            redirect: {
                destination: '/posts',
                permanent: false
            }
        }
    }
}