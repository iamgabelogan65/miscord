import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export const MessageComponent = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const ref = useRef()

    useEffect(() => {
      ref.current?.scrollIntoView({behavior: "smooth"})
    }, [])

  return (
    <div ref={ref} className="chat-message">
        <div className="chat-profile">
            <img src={message.senderID === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt=''/>
        </div>
        <div className="chat-content">
            <h4>{message.senderID === currentUser.uid ? currentUser.displayName : data.user.displayName}</h4>
            <span>{message.text}</span>
            { message.img && <img src={message.img} alt=''/> }
        </div>
  </div>
  )
}
