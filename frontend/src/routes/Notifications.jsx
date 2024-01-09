import { useEffect, useState } from "react";
import { getFriendRequests } from "../api/backend_calls";
import FriendRequest from "../components/FriendRequest";

export default function Notifications({}){
const [friendRequests, setFriendRequests] = useState(false)
const [friendRefresh, setFriendRefresh] = useState(false)

const toggleFriendRefresh = () =>{
    setFriendRefresh(!friendRefresh)
}
    useEffect(() => {
        const fetchFriendRequests = async () => {
          try {
            const requests = await getFriendRequests();
            setFriendRequests(requests)
          } catch (error) {
            console.error("Friend requests error: ", error);
          }
        };
     
        fetchFriendRequests();
     
      }, [friendRefresh])
    return(<>

    notifications
    {friendRequests.message==='You have no friend requests.'?<p>you have no requests</p>:null}
    {friendRequests.message==='friend requests'?
    friendRequests.friend_requests.map((friend, index)=><FriendRequest requestRefresh={toggleFriendRefresh} key={index} friend={friend}/>)
    :null}
    <button onClick={()=>{console.log(friendRequests)}}>print</button>
    </>)
}