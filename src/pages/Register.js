import React, { useState } from 'react'

import { register } from "../firebase/functions"
import { db, storage } from '../firebase/firebase';

import {getDownloadURL } from "firebase/storage";
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable } from "firebase/storage";

import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      //register with u=email and password
      const res = await register(email, password)

      //uploads the user's profile and displayName in Storage
      const storageRef = ref(storage, displayName);

      // this code works for now...
      // the one on the tutorial does not
      uploadBytesResumable(storageRef, file)
      .then( () => {
        getDownloadURL(storageRef).then( async (downloadURL) => {
          console.log(downloadURL)

          // updates profile. adds avatar and displayname to the user in authentication
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL
          })

          // user is stored in collection 'users' in Firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          })

          // await setDoc(doc(db, "userChats", res.user.uid), {})
          navigate("/")
        })
      })

    } catch(err) {
      setErr(true)
    }

  }

  return (
    <div className='form-container'>
        <div className='form-wrapper'>
            <span className='title-logo'>Miscord</span>
            <span className='title-register'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display: 'none'}} type="file" id="file"/>
                <label htmlFor='file'>
                  <p>Select an avatar</p>
                </label>
                <button>Sign up</button>
            </form>
            <p>You have an account? <Link to='/login'>Login</Link></p>
            {err && <span>Something went wrong</span>}
        </div>
    </div>
  )
}

export default Register