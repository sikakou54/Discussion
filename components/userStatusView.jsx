import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";
import UserIcon from "./userIcon";
import styles from '../styles/UserStatusView.module.css';
import Router from 'next/router';

export default function UserStatusView({ userId }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        apiFetchGet('/api/getUser/' + userId, {}).then((response) => {
            setUser(response.data.user);
        });

    }, []);

    if (null !== user) {

        return (
            <div className={styles.userStatusView}>
                <div className={styles.userIcon}><UserIcon userId={userId} width={70} height={70} /></div>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.result}>
                    <div>win:{user.result.win}</div>
                    <div>lose:{user.result.lose}</div>
                    <div>draw:{user.result.draw}</div>
                </div>
                <button className={styles.post} onClick={() => Router.push('/post')}>投稿する</button>
            </div>
        );

    } else {
        return null;
    }

}
