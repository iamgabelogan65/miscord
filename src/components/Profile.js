import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {

    const { currentUser } = useContext(AuthContext)
  return (
    <div className="profile">
      <div className='user-profile'>
        <img src={currentUser.photoURL} alt=""></img>
        <p>{currentUser.displayName}</p>
      </div>
    </div>
  )
}

export default Profile