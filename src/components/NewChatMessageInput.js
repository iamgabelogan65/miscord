import React, { useContext, useState } from 'react'
import { ConvoContext } from '../context/ConvoContext'
import Img from '../../src/img/img-icon.png'
import { AuthContext } from '../context/AuthContext'
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { db, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { v4 as uuidv4 } from 'uuid';

const NewChatMessageInput = () => {

    const [text, setText] = useState("")
    const [img, setImg] = useState(null)

    const [isSubmit, setIsSubmit] = useState(false)

    const { currentUser } = useContext(AuthContext)
    const { convo } = useContext(ConvoContext)



    // create a MESSAGE document and send it to Firestore
    const handleSend = async (e) => {
        e.preventDefault()

        setIsSubmit(true)

        if (text.length === 0) {
          return
        }

        // if a file is attached, do this
        const messageReference = doc(collection(db, "messages"))
        if (img) {

            try {
                const storageRef = ref(storage, uuidv4())

                uploadBytesResumable(storageRef, img)
                .then( () => {
                  getDownloadURL(storageRef).then( async (downloadURL) => {
                    //console.log(downloadURL)
                    await setDoc(messageReference, {
                        msgID: messageReference.id,
                        convoID: convo.convoID,
                        authorID: currentUser.uid,
                        date: Timestamp.now(),
                        text,
                        img: downloadURL
                    })
        
                  })
                })
            } catch(err) {
              console.log(err)
            }
        } 
        // if it is just text and no files attached, do this
        else {
            await setDoc(messageReference, {
                msgID: messageReference.id,
                convoID: convo.convoID,
                authorID: currentUser.uid,
                date: Timestamp.now(),
                text
            })
        }
        
        setText("")
        setImg(null)
        setIsSubmit(false)

    }
    
    return (
        <div className='mychat-container'>
          <form className='mychat-message-input' onSubmit={handleSend}>
            <input type='file' 
              style={{display: "none"}}
              id="message-file"
              onChange={(e) => setImg(e.target.files[0])}
              onClick={event => event.target.value = null}  // this onClick event is important because of this issue on selecting the same file "https://stackoverflow.com/questions/4109276/how-to-detect-input-type-file-change-for-the-same-file"
              disabled={Object.keys(convo).length === 0}     // disables the input if the user has not selected a user to talk to yet     
            />
            <label htmlFor='message-file'>
              <img className='file-image' src={Img} alt="" />
            </label>
            <input
              placeholder='Message here'
              onChange={(e) => setText(e.target.value)}
              value={text}
              disabled={Object.keys(convo).length === 0}    // disables the input if the user has not selected a user to talk to yet
            />
            <input type='button' style={{display: "none"}} disabled={isSubmit}/>
          </form>
        </div>
    )
}

export default NewChatMessageInput 
