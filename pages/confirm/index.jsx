
import { Amplify, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

async function apiFetch(url, param = {}) {
    const response = await fetch(url, param);
    return await response.json()
}

export default function Confirm() {

    const [confirmCode, setConfirmCode] = useState("");
    const router = useRouter();
    const userName = router.query.userName;
    const userId = router.query.userId;

    useEffect(() => {
        Amplify.configure(process.env.awsCognitConfing);
    }, []);

    function onSubmit(event) {

        event.preventDefault();

        Auth.confirmSignUp(userName, confirmCode)
            .then((result) => {
                console.log(result);
                apiFetch(process.env.awsApiGatewayHttpApiEndPoint + "/setUser", {
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId,
                        name: userName
                    })
                }).then((data) => {
                    console.log(data);
                    Router.push('/signIn');
                }).catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <div><label>Confirm:</label><input onChange={(event) => { setConfirmCode(event.target.value) }} type="test" /></div>
                <div><input type="submit" value="Confirm" /></div>
            </form>
        </main>
    );
}
