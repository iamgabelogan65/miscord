import React, { useContext } from 'react'
import { ConvoContext } from '../context/ConvoContext'

export const ChatHeader = () => {
    
    // const { data } = useContext(ChatContext)

    const { convo } = useContext(ConvoContext)
        
    return (
        <div className="chat-header">
            {/* <h2>{data.user?.displayName}</h2> */}
            <h2>{convo.name}</h2>
        </div>
    )
}
