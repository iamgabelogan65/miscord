import { doc, onSnapshot } from 'firebase/firestore'
import React, { useState, useContext, useEffect } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase/firebase'
import { MessageComponent } from './MessageComponent'

export const ChatBody = () => {

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {

        const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
          doc.exists() && setMessages(doc.data().messages.sort((a, b) => { return a.date - b.date}))
        })
    
        return () => { 
            unsub()
        }

      
      }, [data.chatID])

      // console.log(messages)

    return (
        <div className="chat-body">
            {messages.map((m) => (
              <MessageComponent key={m.id} message={m} />
            ))}
        </div>
    )
}
