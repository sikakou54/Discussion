
import { Amplify, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/Home.module.css'

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        Amplify.configure(process.env.awsCognitConfing);
    }, []);

    function onSubmit(event) {

        event.preventDefault();

        Auth.signUp({
            username: userName,
            password,
            attributes: {
                email
            }
        }).then((result) => {
            //console.log("result", result);
            Router.push({
                pathname: "confirm",
                query: {
                    userName: result.user.username,
                    userId: result.userSub
                } // ココ
            });
        }).catch((error) => {
            console.log("error", error);
        });
    }

    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <div><label>Email:</label><input onChange={(event) => { setEmail(event.target.value) }} type="emal" required /></div>
                <div><label>Password:</label><input onChange={(event) => { setPassword(event.target.value) }} type="password" required /></div>
                <div><label>UserName:</label><input onChange={(event) => { setUserName(event.target.value) }} type="text" required /></div>
                <div><input type="submit" value="SignUp" /></div>
            </form>
        </main>
    );
}
