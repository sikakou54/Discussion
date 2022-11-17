import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from "styled-components";
import Discussion from '../../components/Discussion';

export default function DiscussionManager({ discussion, userId, }) {

    return (
        < ThemeProvider theme={lightTheme} >
            <MeetingProvider>
                <Discussion discussion={discussion} userId={userId} />
            </MeetingProvider>
        </ThemeProvider >
    );
}

//SSR
export async function getServerSideProps({ query }) {

    let discussion = null;
    const { postId, userId } = query;

    try {

        if (undefined !== postId && undefined !== userId) {

            // call getDiscussion api
            const res = await fetch(process.env.awsApiGatewayHttpApiEndPoint + "/getDiscussion/" + 'jpn' + '/' + postId);
            if (res.ok) {
                discussion = await res.json();
            }
        }

    } catch (e) {
        discussion = null;
    }

    if (null !== discussion) {
        return {
            props: {
                discussion,
                userId,
            }
        }
    } else {
        return { notFound: true };
    }

}