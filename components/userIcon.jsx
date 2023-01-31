import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetchGet } from "../api/utils";
import logo from '../public/userIcon.svg';
import styles from '../styles/UserIcon.module.css';
import { FaRegUserCircle } from 'react-icons/fa';

export default function UserIcon({ userId, width, height }) {

    const [userIcon, setUserIcon] = useState(logo);

    useEffect(() => {
        if ('none' !== userId) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getUser/' + userId, {}).then((res) => {
                //console.log(res.data);
            });
        }
    }, []);

    return <FaRegUserCircle />;
}
