import React from "react";
import { authService } from "../fbBase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider,} from 'firebase/auth';
import AuthFrom from "../components/AuthForm";

    


const Auth = () => {
const onSocialClick = async (event) => {
    const {target: { name }, } = event;
    let provider;
    if (name === "google") {
        provider = new GoogleAuthProvider();
    } 
    else if (name === "github") {
        provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
};
    return (
    <div>
        <AuthFrom />
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue with Github</button>
        </div>
    </div>
    );
}
export default Auth;