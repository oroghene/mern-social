import React from 'react';
import "./Message.css";

const Message = ({ message, own }) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img src="/assets/post/6.jpeg" alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{message.createdAt}</div>
    </div>
  )
}

export default Message