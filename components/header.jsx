import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";

export default function Header({ userId }) {

    const [userName, setUserName] = useState('');

    useEffect(() => {

        if (undefined !== userId) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + "/getUser/" + userId, {}).then((res) => {
                setUserName(res.data.name);
            });
        }

    }, []);

    return (
        <div>
            <div>Header</div>
            {userName !== '' ? <div>ようこそ {userName} さん</div> : null}
        </div>
    );
}
