import { Amplify, Auth } from 'aws-amplify';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

Amplify.configure(process.env.awsCognitConfing);

export async function signIn(userName, password) {

    let user = undefined;

    try {
        user = await Auth.signIn(userName, password);
        console.log(user);
    } catch (e) {
        console.error('signIn', JSON.stringify(e));
    }

    return user;
}

export async function signUp(username, password, email) {

    let auth = undefined;

    try {

        const result = await Auth.signUp({
            username,
            password,
            attributes: {
                email
            }
        });

        auth = {
            username: result.user.username,
            userId: result.userSub
        };

    } catch (e) {
        console.error('signUp', JSON.stringify(e));
    }

    return auth;
}

export async function confirm(username, code) {

    let auth = undefined;

    try {

        auth = await Auth.confirmSignUp(username, code);

    } catch (e) {
        console.error('confirm', JSON.stringify(e));
    }

    return auth;
}

export async function jwtVerify(jwtToken) {

    let payload = undefined;

    const verifier = CognitoJwtVerifier.create(process.env.cognitoVerifierConfig);

    try {

        payload = await verifier.verify(jwtToken);

    } catch (e) {
        console.error('jwtVerify', JSON.stringify(e));
    }

    return payload;
}