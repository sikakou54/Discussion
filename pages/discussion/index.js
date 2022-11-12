import {
    MeetingProvider,
    lightTheme,
} from 'amazon-chime-sdk-component-library-react';
import { ThemeProvider } from "styled-components";
import Discussion from './items/discussion';
import { useRouter } from 'next/router';

export default function DiscussionManager() {

    const router = useRouter();
    const { postId, userId } = router.query;

    if (undefined !== postId && undefined !== userId) {

        return (
            < ThemeProvider theme={lightTheme} >
                <MeetingProvider>
                    <Discussion postId={postId} userId={userId} />
                </MeetingProvider>
            </ThemeProvider >
        );

    } else {
        return null;
    }

}