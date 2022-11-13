
import { Amplify, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../../styles/Home.module.css'

export default function SignIn() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        Amplify.configure(process.env.awsCognitConfing);
    }, []);

    function onSubmit(event) {

        event.preventDefault();

        Auth.signIn(userName, password)
            .then((result) => {
                console.log(result);
                Router.push({
                    pathname: "posts",
                    query: {
                        userId: result.attributes.sub
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <main className={styles.main}>
            <form onSubmit={onSubmit}>
                <div><label>UserName:</label><input onChange={(event) => { setUserName(event.target.value) }} type="text" required /></div>
                <div><label>Password:</label><input onChange={(event) => { setPassword(event.target.value) }} type="password" required /></div>
                <div><input type="submit" value="SignIn" /></div>
                <Link href={'/signUp'}>SignUp</Link>
            </form>
        </main>
    );
}
