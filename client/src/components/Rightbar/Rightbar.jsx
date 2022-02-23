import React, { useContext, useEffect, useState } from 'react';
import "./Rightbar.css";
import { Online } from '..';
import { Users } from '../../data';
import {axiosInstance} from '../../config';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import {Add, Remove} from '@material-ui/icons';

const Rightbar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.following.includes(user?.id));

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?.id))
  }, [currentUser, user])
  

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axiosInstance.get("/users/friends/"+user._id);
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);
  
  const handleClick = async () => {
    try {
      if (followed) {
        await axiosInstance.put("/users/"+user._id+"/unfollow", {userId: currentUser._id});
        dispatch({type: "UNFOLLOW", payload: user._id});
      } else {
        await axiosInstance.put("/users/"+user._id+"/follow", {userId: currentUser._id});
        dispatch({type: "FOLLOW", payload: user._id});
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>2 other friends</b> are celebrating their birthday today</span>
        </div>
        <img src={`${PF}ad.png`} alt="paid advertisement" className="rightbarAd" />
        <h4 className="rightbarTitle">Friends online</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (<Online key={user.id} user={user} />))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='rightbarTitle'>User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship Status: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1 ? "Single" : 
               user.relationship === 2 ? "Dating" : "Married"}
            </span>
          </div>
        </div>
        <h4 className='rightbarTitle'>Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link key={friend._id} to={`/profile/${friend.username}`} style={{textDecoration:'none'}}>
              <div className="rightbarFollowing">
                <img src={friend.profilePiccture ? PF + friend.profilePiccture : PF + "person/noAvatar.png"} alt="" 
                className="rightbarFollowingImg" />
                <span className="rightbarFollowingNmae">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
      <div className='rightbar'>
        <div className="rightbarWrapper">
          {user ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
  );
};

export default Rightbar;
