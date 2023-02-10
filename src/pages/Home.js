import React from 'react'
import Chat from '../components/Chat'
import NewSidebarFriend from '../components/NewSidebarFriend'
import SidebarFriend from '../components/SidebarFriend'
import SidebarServer from '../components/SidebarServer'

const ChatPage = () => {

    return (
        <div className="chat-container">
            <SidebarServer />
            <NewSidebarFriend/>
            <Chat />
        </div>
    )
}

export default ChatPage