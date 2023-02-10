import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

import { collection, getDocs, getDoc, query, setDoc, where, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase/firebase';

const Search = () => {

    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const { currentUser } = useContext(AuthContext)

    console.log(currentUser)

    // handle search uses firebase queries in Firestore
    const handleSearch = async () => {

        setUser(null)

        const q = query(collection(db, "users"), where("displayName", "==", username))
        try {
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
                console.log(doc.data())
            })
        } catch (err) {
            setErr(true)
            console.log(err)
        }

    }

    // if "Enter" key is pressed, it will do a user search
    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch()
    }


    const handleSelect = async () => {
        // check if the group chat (chat in firestore) exists. If not, create
        
        // what is the logic behind this combinedID?
        const combinedID = 
        currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid 

        try {
            const res = await getDoc(doc(db, "chats", combinedID))

            if (!res.exists()) {
                // create a chat in chats collection
                await setDoc(doc(db, "chats", combinedID), { messages: [] })

                // create user chat for "currentUser"
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedID+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                })

                //create the same user chat for the "user" selected on search
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedID+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedID+".date"]: serverTimestamp()
                })
            }

        } catch (err) { console.log(err) }
        
        setUser(null)
        setUsername("")
    }

    return (
        <div className='search-friends'>
            <input
                type='text' 
                placeholder='Find a user'
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKey}
                value={username}
            />
            {err && <span>User not found</span>}
            {user && 
            <div onClick={handleSelect}>
                <h1>{user.displayName}</h1>
            </div>
            }
        </div>
    )
}

export default Search