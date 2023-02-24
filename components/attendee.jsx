import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Attendee.module.css';
import user from '../public/user.svg';
import { apiFetchGet } from '../api/utils';

export default function Attendee({ userId, children }) {

    const [userName, setUserName] = useState('');

    useEffect(() => {

        if ('none' !== userId) {
            apiFetchGet(process.env.awsApiGatewayHttpApiEndPoint + '/getUser/' + userId).then((response) => {
                if (200 == response.statusCode) {
                    setUserName(response.data.name);
                }
            });
        }

    }, [userId]);

    return (
        <div className={styles.container}>
            {
                '' === userName ?
                    (
                        <>
                            <div className={styles.text}>{children}</div>
                        </>
                    ) :
                    (
                        <>
                            <div className={styles.userIcon}>
                                < Image src={user} />
                            </div>
                            <div>
                                <div className={styles.text}>{children}</div>
                                <div className={styles.userName}>{userName} さん</div>
                            </div>

                        </>
                    )
            }
        </div>
    );
}
