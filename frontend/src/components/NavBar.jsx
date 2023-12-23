import { Link, useNavigate } from 'react-router-dom';
import './css/nav_bar.css'
import logo from '../assets/chapter-chat-high-resolution-logo-transparent.png';
import { getLeaderboard } from '../api/backend_calls';
import { useEffect, useState } from 'react';


export default function Navbar({ userToken, setCreatingBookClub, setBookClubSelected}) {
  const [allUsers, setAllUsers] = useState(false)
  const [inputValue, setInputValue]=useState("")
  const [userSearching, setUserSearching] = useState(false)
  const navigate = useNavigate();

  const handleInputChange = (e) =>{
    setInputValue(e.target.value)
  }

  const filteredUsernames = Object.values(allUsers).filter(
    (user) =>
      user.username.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleNavigate = (otherProfilePk) =>{
    navigate(`/othersProfile/${otherProfilePk}`)
    window.location.reload(true);
  }

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

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const results = await getLeaderboard();
        setAllUsers(results)
      } catch (error) {
        console.error("Leaderboard error: ", error);
      }
    };
      if(userToken){
        fetchLeaderBoard();
      }
  }, [userSearching])

  return (
    <ul className="navbar">
      <div id="logoBox">
        <img src={logo} onClick={() => handleLinkClick('/')} className="logo" id="main-logo"/>
      </div>
      <div className='rightSide'>
        {userToken && <div className='userSearch'>
          People Search: {' '}
          <input className='userSearchBox' onClick={()=>{setUserSearching(!userSearching)}} onChange={(e)=>{handleInputChange(e)}} value={inputValue} type='search'></input>
          {inputValue && (
          <ul className='userSearchResults'>
            {filteredUsernames.map((user, index) => (
              <li onClick={()=>{handleNavigate(user.user_id)}} key={index}>{user.username}</li>
            ))}
        </ul>
      )}
        </div>}

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
