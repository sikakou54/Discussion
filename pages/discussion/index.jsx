import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from 'styled-components';
import Discussion from '../../components/discussion';
import { apiFetchGet } from '../../api/utils';
import Layout from '../../components/layout';
import { useEffect, useState } from 'react';

export default function DiscussionManager({ postId, userId }) {

    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {

        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getDiscussion/' + 'jpn' + '/' + postId).then((response) => {
            console.log(response);
            setDiscussion(response.data);
        });

    }, []);

    if (null !== discussion) {

        return (
            <Layout userId={userId} title={'Discussion'}>
                < ThemeProvider theme={lightTheme} >
                    <MeetingProvider>
                        <Discussion discussion={discussion} userId={userId} />
                    </MeetingProvider>
                </ThemeProvider >
            </Layout>
        );

    } else {
        return null;
    }
}

//SSR
export async function getServerSideProps(ctx) {

    const { postId } = ctx.query;

    return {
        props: {
            postId,
            userId: 'a18c3444-56c3-43c3-a34b-41263fd64d35'
        }
    };

}