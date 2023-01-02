import React, { useState } from "react";
import { dbService, storageService } from "../fbBase";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { ref, deleteObject, } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {
                editing ? ( 
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input 
                                type="text" 
                                placeholder="Edit your nweet" 
                                value={newNweet} 
                                required 
                                autoFocus
                                onChange={onChange}
                                className="formInput"
                            />
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                    </>
                ) : (
                    <>
                    <div>{nweetObj.text}</div>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    <div>{new Date(nweetObj.createdAt).toLocaleString()}</div>
                        {isOwner && (
                            <div class="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>    
                    )}
                </>)
            }
        </div>
    );
};
    
export default Nweet;

