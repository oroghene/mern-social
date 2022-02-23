import {axiosInstance} from '../../config';
import React, { useEffect, useState } from 'react';
import { Feed, Navbar, Rightbar, Sidebar } from '../../components';
import "./Profile.css";
import { useParams } from 'react-router';

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams()
  const username = params.username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.jpg"} alt="cover" className="profileCoverImg" />
              <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="profile" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
