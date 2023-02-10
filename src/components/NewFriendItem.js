import React, { useContext } from 'react'
import { ConvoContext } from '../context/ConvoContext'

const NewFriendItem = ({ chatInfo }) => {

    const { dispatch } = useContext(ConvoContext)

    // later feature
    // make a function here that handles the image
    // if it is a group message, do the group chat picture that discord does
    // if it is only to one person, get that user's profile

    // later feature
    // i need to store the convoID in local storage to persist the convoID to avoid disappearing on page reload
    // then i need to remove it from local storage when user logs out
    const handleSelect = () => {
        dispatch({ type: "SET_CONVO", payload: chatInfo })
    }

    return (
        <div className="friend-item" onClick={handleSelect}>
        <div className="friend-item-profile">
            <img src='' alt=''/>
        </div>
        <div className='friend-item-username'>
          <p>{chatInfo.name}</p>
           <p className='friend-item-last-message'>{chatInfo.lastMessage?.text}</p>  {/* the "?" is IMPORTANT because initially the last message is undefined if there was no conversation yet */}
        </div>

    </div>
    )
}

export default NewFriendItem
