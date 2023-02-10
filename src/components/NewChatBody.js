import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ConvoContext } from '../context/ConvoContext'
import { db } from '../firebase/firebase'
import NewMessage from './NewMessage'

const NewChatBody = () => {

    const { convo } = useContext(ConvoContext)
    const [messages, setMessages] = useState([])

    useEffect(() => {

        setMessages([])  // IMPORTANT: this fixes the bug of displaying messages to an empty convo thats from a different convo 

        const fetchMessages = () => {
    
            const q = query(collection(db, "messages"), where("convoID", "==", convo.convoID))
            const unsub = onSnapshot(q, (querySnapshot) => {
                const m = []
                querySnapshot.forEach((doc) => {
                    m.push(doc.data())
                    setMessages(m)   // IMPORTANT : PUT THE SET STATE FUNCTION INSIDE THE FOR EACH FUNCTION. NOOOT OUTSIDE
                    return () => {
                        unsub()
                    }
                })
            })
        }

        convo.convoID && fetchMessages()


    }, [convo.convoID])

    
    // console.log('convoID selected', convo.convoID)
    // console.log('messages', messages)

    return (
        <div className="chat-body">
            {messages?.sort((a,b) => a.date - b.date).map((m) => (
              <NewMessage key={m.msgID} message={m} />
            ))}
        </div>
    )
}

export default NewChatBody
