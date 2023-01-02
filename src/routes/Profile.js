import React, { useState } from "react";
import { authService, } from "../fbBase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";


export default ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const onChange = (event) => {
        const {target : {value},} = event;
        setNewDisplayName(value);
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };
    return (
        <>
        <form onSubmit={onSubmit}>
            <input 
                onChange={onChange} 
                type="text" 
                placeholder="Display name" 
                value={newDisplayName} 
            />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};