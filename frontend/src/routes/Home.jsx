import * as React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { getLeaderboard, getPagesCompleted} from '../api/backend_calls';
import './css/home_page.css'
import mglass from '../assets/magnifying-glass.png';
import list from '../assets/list.png';
import leaders from '../assets/leaderboard.png';
import networking from '../assets/networking.png';
import rate from '../assets/rate.png';
import tally from '../assets/tally-marks.png';


export default function Home({ userToken }) {
    const [totalPages, setTotalPages] = useState(null)
    const [userName, setUserName] = useState(null)
    const [leaderboard, setLeaderBoard] = useState([])
    

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const pagesRead = await getLeaderboard();
        const appUser = await getPagesCompleted();
        setLeaderBoard(pagesRead)
        setUserName(appUser.username)

        
      } catch (error) {
        console.error("Leaderboard error: ", error);
      }
    };

    fetchLeaderBoard();
  }, [])
console.log(userName)
  return (
    <div className="homePage">


        <div className="start-here-container">
          <div className="start-here-item genericBox">
          <h3>Leaderboard</h3>
                  {leaderboard !== null && leaderboard.length > 0 ? (
                    <ol>
                      {leaderboard
                        .sort((a, b) => b.pages_completed - a.pages_completed)
                        .slice(0, 5) 
                        .map((user, index) => (
                          <li key={index}>{`${user.username}: ${user.pages_completed}`}</li>
                        ))}
                    </ol>
                  ) : (
                    'Log in to view Leaders'
                  )}
          
          
          </div>
          <div className="start-here-item genericBox">
            {userName ? (<div className="welcome-user">Welcome {userName}!</div>) : (
            <>
            <b>Begin your literary journey by clicking down below</b>
            <div><Link to={'/signup'}><button className="myButton" id="signup-butt">Sign Up</button></Link></div>
              </>
            )}

          </div>
        </div>


        <div className="page-item">
          <h2 className="welcome">Welcome to Chapter Chat!</h2>
            <div className='feature'>
              <img src={mglass} />
                <span className="feature-text">Seamlessly search for books by title, author, or subject</span>
            </div>
            <div className='feature'>
              <img src={list} />
                <span className="feature-text">manage your reading journey by adding books to your "To Be Read" or "Completed" lists</span>
            </div>
            <div className='feature'>
              <img src={rate} />
                <span className="feature-text">Rate, recommend, and explore user ratings and suggestions for books</span>
            </div>
            <div className='feature'>
              <img src={leaders} />
                <span className="feature-text">earn a spot on the leaderboard for most pages read</span>
            </div>
            <div className='feature'>
              <img src={tally} />
                <span className="feature-text">Keep a running tally of your total pages read</span>
            </div>
            <div className='feature'>
              <img src={networking} />
                <span className="feature-text">Engage with fellow readers through the book club feature</span>
            </div>
        </div>
                <div className="icon-ref"> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>

  </div>
              

  );
}


