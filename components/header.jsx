import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";
import styles from '../styles/Header.module.css';

export default function Header({ userId }) {

    const [userName, setUserName] = useState(undefined);

    useEffect(() => {

        if (undefined !== userId) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getUser/" + userId, {}).then((res) => {
                setUserName(res.data.name);
            });
        }

    }, []);

    return (
        <div className={styles.container}>
            <div>Header</div>
            {undefined !== userName ? <div>ようこそ {userName} さん</div> : <div></div>}
        </div>
    );
}
