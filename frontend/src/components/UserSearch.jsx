import { useEffect, useState } from "react"
import { getLeaderboard } from '../api/backend_calls';
import { Link, useNavigate } from 'react-router-dom';

export default function UserSearch(){
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
    useEffect(() => {
        const fetchLeaderBoard = async () => {
          try {
            const results = await getLeaderboard();
            setAllUsers(results)
          } catch (error) {
            console.error("Leaderboard error: ", error);
          }
        };

            fetchLeaderBoard();

      }, [userSearching])
    return(<>
    <div className='userSearch'>
          People Search: {' '}
          <input className='userSearchBox' onClick={()=>{setUserSearching(!userSearching)}} onChange={(e)=>{handleInputChange(e)}} value={inputValue} type='search'></input>
          {inputValue && (
          <ul className='userSearchResults'>
            {filteredUsernames.map((user, index) => (
              <li onClick={()=>{handleNavigate(user.user_id)}} key={index}>{user.username}</li>
            ))}
        </ul>
      )}
        </div>
    
    </>)
}