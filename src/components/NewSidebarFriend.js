import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase/firebase'
import NewFriendItem from './NewFriendItem'
import NewSearch from './NewSearch'
import Profile from './Profile'

const NewSidebarFriend = () => {

    const { currentUser } = useContext(AuthContext)

    const [convos, setConvos] = useState([])

    useEffect(() => {
        // get all convos where currentUser is in. Check all convos where currentUser.uid
        // is in the members array field

        const getConvos = () => {
        
            const q = query(collection(db, "convos"), where("members", "array-contains", currentUser.uid))
            const unsub = onSnapshot(q, (querySnapshot) => {
                const c = []
                querySnapshot.forEach((doc) => {
                    c.push(doc.data())
                    setConvos(c)   // IMPORTANT : PUT THE SET STATE FUNCTION INSIDE THE FOR EACH FUNCTION. NOOOT OUTSIDE

                    return () => {
                        unsub()
                    }

                })
            })

        }

        currentUser.uid && getConvos()


    }, [currentUser.uid])


    // console.log('convos', convos)

    return (
        <div className='panel-2'>
            <div className='friends'>
                <NewSearch/>
                {convos.map((c) => (
                    <NewFriendItem key={c.convoID} chatInfo={c}/>
                ))}
            </div>
            <Profile />
      </div>
    )
}

export default NewSidebarFriend 
