import React from 'react'
import { ChatBody } from './ChatBody'
import { ChatHeader } from './ChatHeader'
import NewChatBody from './NewChatBody'
// import { ChatMessageInput } from './ChatMessageInput'
import NewChatMessageInput from './NewChatMessageInput'

const Chat = () => {

  return (
    <div className="panel-3">
      <ChatHeader />
      <NewChatBody />
      <NewChatMessageInput />
    </div>
  )
}

export default Chat