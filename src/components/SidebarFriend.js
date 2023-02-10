import React, { useContext, useEffect, useState } from 'react'
import Profile from '../components/Profile'
import Search from '../components/Search'
import { FriendItem } from './FriendItem'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase';
import { AuthContext } from '../context/AuthContext';
import NewSearch from './NewSearch';



const SidebarFriend = () => {

  const { currentUser } = useContext(AuthContext)
  const [chats, setChats] = useState([])
  
  // real time retrieving data using "onSnapshot"
  // great features of Firebase
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
  
        return () => {
          unsub()
      }
      });
    }

    currentUser.uid && getChats()

  }, [currentUser.uid])


  // console.log(Object.entries(chats))
  return (
      <div className='panel-2'>
        <div className='friends'>
          <NewSearch/>

          {/* {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
            <FriendItem key={chat[0]} chatInfo={chat}/>
          ))} */}
        </div>
        <Profile />
      </div>
  )
}

export default SidebarFriend