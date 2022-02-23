import {axiosInstance} from '../../config';
import React, { useEffect, useState } from 'react';
import "./ChatOnline.css";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  
  useEffect(() => {
    const getFriends = async () => {
      const res = await axiosInstance.get("/users/friends/" + currentId);
      setFriends(res.data); 
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
    const res = await axiosInstance.get(`/conversations/find/${currentId}/${user._id}`);
    setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='chatOnline'>
      {onlineFriends.map((friend) => (
        <div key={friend._id} className="chatOnlineFriend" onClick={() => handleClick(friend)}>
          <div className="chatOnlineImgContainer">
            <img 
              src={friend?.profilePicture 
                    ? PF + friend?.profilePicture
                    : PF + "person/noAvatar.png"} 
              alt="" className="chatOnlineImg" 
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{friend.username}</span>
        </div>
      ))}
    </div>
  )
}

export default ChatOnline