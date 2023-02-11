import Router from 'next/router';
import Button from '../../components/button';
import Layout from '../../components/layout';
import { discussionErrorCode, discussionErrorMsg } from '../../define/define';
import styles from '../../styles/Error.module.css';

export default function Error({ message, userId }) {

    return (
        <Layout userId={userId} title={'Error'}>
            <div className={styles.container}>
                <div className={styles.message}>{message}</div>
                <div className={styles.return}>
                    <Button onClick={() => Router.push('/posts')} text={'投稿へ'} />
                </div>
            </div>
        </Layout>
    );
}

//SSR
export async function getServerSideProps(context) {

    let message = 'システムエラー';
    const { code } = context.query;
    const userId = 'a18c3444-56c3-43c3-a34b-41263fd64d35';

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
