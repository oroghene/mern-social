import React, { useContext, useEffect, useState } from 'react';
import "./Post.css";
import { MoreVert } from '@material-ui/icons';
import {axiosInstance} from '../../config';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
// import {format} from 'timeago';

const Post = ({post}) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currentUser} = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/like", {userId: currentUser._id})
    } catch (error) {
      
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'} alt="profile" className="postProfileImg" />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF+post.img} alt="my feed" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler} />
            <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like this</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
