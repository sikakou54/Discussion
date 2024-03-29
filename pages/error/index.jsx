import Router from 'next/router';
import Layout from '../../components/layout';
import { discussionErrorCode, discussionErrorMsg } from '../../define/define';
import styles from '../../styles/Error.module.css';

export default function Error({ message }) {

    function onClick() {
        Router.push({
            pathname: '/posts'
        });
    }

    return (
        <Layout title={'Error'}>
            <div className={styles.container}>
                <div className={styles.message}>{message}</div>
                <button className={styles.return} onClick={onClick}>戻る</button>
            </div>
        </Layout>
    );
}

//SSR
export async function getServerSideProps(context) {

    let message = 'システムエラー';
    const { code } = context.query;

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

        case discussionErrorCode.roomMakeError:
            message = discussionErrorMsg.roomMakeError;
            break;

        default:
            break;
    }

    return {
        props: {
            message
        }
    }
}
