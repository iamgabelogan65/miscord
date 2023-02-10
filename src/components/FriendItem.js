import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext';

export const FriendItem = ({ chatInfo }) => {

  const { dispatch } = useContext(ChatContext)

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  // handleSelect={handleSelect(chat[1].userInfo)}
  return (
    <div className="friend-item" onClick={() => handleSelect(chatInfo[1].userInfo)}>
        <div className="friend-item-profile">
            <img src={chatInfo[1].userInfo.photoURL} alt=''/>
        </div>
        <div className='friend-item-username'>
          <p>{chatInfo[1].userInfo.displayName}</p>
           <p className='friend-item-last-message'>{chatInfo[1].lastMessage?.text}</p>  {/* the "?" is IMPORTANT because initially the last message is undefined if there was no conversation yet */}
        </div>

    </div>
  )
}
