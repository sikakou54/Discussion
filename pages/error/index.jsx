import Router from 'next/router';
import { jwtVerify } from '../../api/auth';
import Layout from '../../components/layout';
import { discussionErrorCode, discussionErrorMsg } from '../../define/define';

export default function Error({ message, userId }) {

    return (
        <Layout userId={userId} title={'Error'}>
            <div>{message}</div>
            <button onClick={() => Router.push('/posts')}>投稿へ</button>
        </Layout>
    );
}

//SSR
export async function getServerSideProps(context) {

    let message = 'システムエラー';
    const { code } = context.query;
    const payload = await jwtVerify(process.env.jwt);
    const userId = payload.sub;

    switch (Number(code)) {

        case discussionErrorCode.discussionFailed:
            message = discussionErrorMsg.discussionFailed;
            break;

        case discussionErrorCode.discussionJoinFailed:
            message = discussionErrorMsg.discussionJoinFailed;
            break;

        case discussionErrorCode.discussionStartFailed:
            message = discussionErrorMsg.discussionStartFailed;
            break;

        case discussionErrorCode.websocketDisconnect:
            message = discussionErrorMsg.websocketDisconnect;
            break;

        case discussionErrorCode.websocketError:
            message = discussionErrorMsg.websocketError;
            break;

        default:
            break;
    }

    return {
        props: {
            message,
            userId
        }
    }
}
