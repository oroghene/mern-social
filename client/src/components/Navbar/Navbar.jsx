import React, { useContext } from 'react';
import "./Navbar.css";
import { Chat, Notifications, Person, Search } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
      <div className='navbarContainer'>
          <div className="navbarLeft">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="logo">notLinkedIn</span>
            </Link>
          </div>
          <div className="navbarCenter">
            <div className="searchBar">
              <Search className='searchIcon' />
              <input type="text" placeholder='search for anything' className="searchInput" />
            </div>
          </div>
          <div className="navbarRight">
            <div className="navbarLinks">
              <span className="navbarLink">Homepage</span>
              <span className="navbarLink">Timeline</span>
            </div>
            <div className="navbarIcons">
              <div className="navbarIconItem">
                <Person />
                <span className="navbarIconBadge">1</span>
              </div>
              <div className="navbarIconItem">
                <Chat />
                <span className="navbarIconBadge">3</span>
              </div>
              <div className="navbarIconItem">
                <Notifications />
                <span className="navbarIconBadge">5</span>
              </div>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="navbarImg" />
          </Link>
      </div>
  ) ;
};

export default Navbar;
