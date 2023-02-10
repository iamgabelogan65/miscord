import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase/firebase'

const NewMessage = ({ message }) => {

    const ref = useRef()

    const [author, setAuthor] = useState(null)

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [])

        // get authorID's profile picture
        // get authorID's username
    useEffect(() => {

        // get authorID's profile picture
        // get authorID's username

        const fetchAuthor = async () => {
            const docRef = doc(db, "users", message.authorID)
            try {
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setAuthor(docSnap.data())
                } else {
                    console.log('no such document')
                }

            } catch (err) {
                console.log(err)
            }
        }

        message.authorID && fetchAuthor()

    }, [message.authorID])


    return (
        <div ref={ref} className="chat-message">
            <div className="chat-profile">
                <img src={author && author.photoURL} alt=''/>
            </div>
            <div className="chat-content">
                <h4>{author && author.displayName}</h4>
                <span>{message.text}</span>
                { message.img && <img src={message.img} alt=''/> }
            </div>
        </div>
    )
}

export default NewMessage
