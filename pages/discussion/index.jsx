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

    if (-1 !== Object.keys(cookie).indexOf('jwt')) {

        const res = await apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussion/" + 'jpn' + '/' + postId, {
            headers: {
                Authorization: cookie.jwt
            }
        });

        if (res.result) {

            const { sub } = await jwtVerify(cookie.jwt);

            return {
                props: {
                    discussion: res.data,
                    userId: sub
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

    } else {

        return {
            redirect: {
                destination: '/signIn',
                permanent: false
            }
        }
    }

}