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
            <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    onChange={onChange} 
                    type="text" 
                    autoFocus
                    placeholder="Display name" 
                    value={newDisplayName}
                    className="formInput"
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
            </div>
        </>
    );
};