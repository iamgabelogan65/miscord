import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

import Img from '../../src/img/img-icon.png'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/firebase'

import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const ChatMessageInput = () => {

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const [text, setText] = useState("")
  const [img, setImg] = useState(null)


  // handles sending messages in the "message" array in "chats" (Firestore)
  // also uploads the sent image to Storage
  const handleSend = async (e) => {

    e.preventDefault()

    if (img) {

      try {
        const storageRef = ref(storage, uuidv4())

        uploadBytesResumable(storageRef, img)
        .then( () => {
          getDownloadURL(storageRef).then( async (downloadURL) => {
            //console.log(downloadURL)

            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderID: currentUser.uid,
                date: Timestamp.now(),  // serverTimestamp() doesnt work "serverTimestamp() can only be used with update() and set()"
                img: downloadURL
              })
            })

            
          })
        })
    } catch(err) {
      console.log(err)
    }

    } else {
      await updateDoc(doc(db, "chats", data.chatID), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now(),  // serverTimestamp() doesnt work "serverTimestamp() can only be used with update() and set()"
        })
      })
    }

    // adds the last message and date on the currentUser's POV
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatID + ".lastMessage"]: {
        text
      },
      [data.chatID + ".date"] : serverTimestamp()
    })

    // adds the last message and date on the user that currentUser is talking to
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatID + ".lastMessage"]: {
        text
      },
      [data.chatID + ".date"] : serverTimestamp()
    })


    setText("")
    setImg(null)

  }

  return (
      <div className='mychat-container'>
        <form className='mychat-message-input' onSubmit={handleSend}>
          <input type='file' 
            style={{display: "none"}}
            id="message-file"
            onChange={(e) => setImg(e.target.files[0])}
            onClick={event => event.target.value = null}  // this onClick event is important because of this issue on selecting the same file "https://stackoverflow.com/questions/4109276/how-to-detect-input-type-file-change-for-the-same-file"
            disabled={data.chatID === 'null'}     // disables the input if the user has not selected a user to talk to yet     
          />
          <label htmlFor='message-file'>
            <img className='file-image' src={Img} alt="" />
          </label>
          <input
            placeholder='Message here'
            onChange={(e) => setText(e.target.value)}
            value={text}
            disabled={data.chatID === 'null'}    // disables the input if the user has not selected a user to talk to yet
          />
          <input type='submit' style={{display: "none"}}/>
        </form>
      </div>
  )
}
