import { Link, useNavigate } from 'react-router-dom';
import './css/nav_bar.css'
import logo from '../assets/chapter-chat-high-resolution-logo-transparent.png';
import { getLeaderboard } from '../api/backend_calls';
import { useEffect, useState } from 'react';


export default function Navbar({ userToken, setCreatingBookClub, setBookClubSelected}) {


  const navigate = useNavigate();


  const handleLinkClick = (path) => {
    setInputValue('')
    if (path === '/') {
      navigate('/')
    } else if (!userToken && path != '/login') {
      alert("you must be logged in")
      navigate('/login')
    } else {
      if (path === '/BookClub'){
        setBookClubSelected(false)
        setCreatingBookClub(false)
      }
      navigate(path);
    }
  };


  return (
    <ul className="navbar">
      <div id="logoBox">
        <img src={logo} onClick={() => handleLinkClick('/')} className="logo" id="main-logo"/>
      </div>
      <div className='rightSide'>

        <div className="linksBox">
          <li className="nav-item" onClick={() => handleLinkClick('/')}>
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/profile')}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/search')}>
            <Link to="/search">Search</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/BookClub')}>
            <Link to="/BookClub">Clubs</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/friends')}>
            <Link to="/friends">friends</Link>
          </li>
          {userToken ? 
              <li className="nav-item" onClick={() => handleLinkClick('/logout')}>
                <Link to="/logout">Logout</Link>
              </li>
            :   
            <li className="nav-item" onClick={() => handleLinkClick('/login')}>
                <Link to="/login">Login</Link>
              </li>
          }
        </div>
      </div>
    </ul>
  );
}
