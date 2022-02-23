import React, { useContext, useEffect, useState } from 'react';
import "./Feed.css";
import { Post, Share } from '../../components';
import {axiosInstance} from '../../config';
import { AuthContext } from '../../Context/AuthContext';

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
        ? await axiosInstance.get("/posts/profile/"+username) 
        : await axiosInstance.get("/posts/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  
  return (
      <div className='feed'>
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}
          {posts.map((post) => (<Post key={post._id} post={post} />))}
        </div>
      </div>
  );
};

export default Feed;
