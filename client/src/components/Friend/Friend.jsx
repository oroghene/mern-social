import React from 'react';
import "./Friend.css";

const Friends = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img src={PF+user.profilePicture} alt="friend" className="sidebarFriendImg" />
      {user.username}
    </li>
  );
};

export default Friends;
