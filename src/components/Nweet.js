import React, { useState } from "react";
import { dbService, storageService } from "../fbBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { ref, deleteObject, } from "firebase/storage";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef =doc(dbService, "nweets", `${nweetObj.id}`);
    const desertRef = ref(storageService, nweetObj.attachmentUrl);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok) {
            await deleteDoc(NweetTextRef);
            await deleteObject(desertRef);
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, { text: newNweet, });
        setEditing(false);
    };
    const onChange = (event) => {
        const {target:{value},} = event;
        setNewNweet(value);
    };
    return(
        <div>
            {
                editing ? ( 
                    <>
                        <form onSubmit={onSubmit}>
                            <input 
                                type="text" 
                                placeholder="Edit your nweet" 
                                value={newNweet} 
                                required 
                                onChange={onChange}
                            />
                            <input type="submit" value="Update Nweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                    <div>{nweetObj.text}</div>
                    {nweetObj.attachmentUrl && (<img src={nweetObj.attachmentUrl} width="50px" height="50px" />)}
                    <div>{new Date(nweetObj.createdAt).toLocaleString()}</div>
                        {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )};
                </>)
            }
        </div>
    );
};
    
export default Nweet;
