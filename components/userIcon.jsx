import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";
import logo from '../public/userIcon.svg';
import styles from '../styles/UserIcon.module.css';

export default function UserIcon({ userId, width, height }) {

    const [userIcon, setUserIcon] = useState(logo);

    useEffect(() => {
        if ('none' !== userId) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getUser/' + userId, {}).then((res) => {
                //console.log(res.data);
            });
        }
    }, []);

    return (
        <div className={styles.circle} style={{ width: width, height: height }}>
            <Image
                src={userIcon}
                width={width - 10}
                height={height - 10}
            />
        </div>
    );
}
