import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { ConvoContext } from '../context/ConvoContext'
import { logout } from '../firebase/functions'

const SidebarServer = () => {

  const { dispatch : chatDispatch } = useContext(ChatContext)
  const { dispatch: convoDispatch } = useContext(ConvoContext)

  const handleLogOut = () => {
    logout()
    convoDispatch({ type: "SET_CONVO", payload: {} })
    chatDispatch({ type: "LOGOUT_USER", payload: {} }) // i added this because i need reset the ChatContext. need to set it back to initial state
  }
  return (
    <div className="panel-1">
        <div onClick={handleLogOut} className="server-head-logout"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>   
        <div className="server-head"></div>
        <div className="server-head"></div>             
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
        <div className="server-head"></div>
    </div>
  )
}

export default SidebarServer