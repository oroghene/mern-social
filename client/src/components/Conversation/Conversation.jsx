import {axiosInstance} from '../../config';
import React, { useEffect, useState } from 'react';
import "./Conversation.css";

const Conversation = ({conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axiosInstance("/users?userId="+friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  
  return (
    <div className='conversation'>
      <img src={
        user?.profilePicture 
          ? PF + user?.profilePicture 
          : PF + "person/noAvatar.png"} alt="" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation