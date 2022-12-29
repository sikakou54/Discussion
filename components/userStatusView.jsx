import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";
import UserIcon from "./userIcon";
import styles from '../styles/UserStatusView.module.css';
import PostButton from "./postButton";

export default function UserStatusView({ userId }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getUser/' + userId, {}).then((res) => {
            setUser(res.data);
        });

    }, []);

    if (null !== user) {

        return (
            <>
                <div className={styles.userStatusView}>
                    <div className={styles.userIcon} ><UserIcon userId={userId} width={100} height={100} /></div>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.result}>
                        <div>win:{user.result.win}</div>
                        <div>lose:{user.result.lose}</div>
                        <div>draw:{user.result.draw}</div>
                    </div>
                    <div className={styles.post}><PostButton /></div>
                </div>
            </>
        );

    } else {
        return null;
    }

}
