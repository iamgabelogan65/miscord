import React from 'react'

export const DummyMessage = () => {
  return (
    <div className="chat-message">
        <div className="chat-profile">
            <img src='https://picsum.photos/200/300' alt=''/>
        </div>
        <div className="chat-content">
            <h4>user here</h4>
            <span>message here</span>
        </div>
  </div>
  )
}
