import { getFriends } from "../api/backend_calls"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import UserSearch from "../components/UserSearch";
export default function FriendsPage(){
    const[friendsList, setFriendsList] = useState(false)
    const navigate = useNavigate();
    const handleNavigate = (otherProfilePk) =>{
        navigate(`/othersProfile/${otherProfilePk}`)
        window.location.reload(true);
      }


    useEffect(() => {
        const fetchFrindsList = async () => {
            const friends = await getFriends()
            setFriendsList(friends)
        };
        fetchFrindsList()
    }, [])

    return (
        <div className="friendsPage">
            <h1>Your Friends</h1>
            <UserSearch />
            {friendsList && friendsList.message === "friends" ? (
                friendsList.friends.map((friend, index) => (
                    <p onClick={()=>{handleNavigate(friend.id)}} className="genericBox makeItHover" key={index}>{friend.username}</p>
                ))) 
                :(
                    <p>No friends</p>
                )}
            <button onClick={() => console.log(friendsList)}>Print</button>
        
        </div>
      );
    }