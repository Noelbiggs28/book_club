import { useEffect, useState } from "react"
import { modifyFriendsList, getFriends, modifyFriendRequest, getFriendRequestsSent } from "../api/backend_calls"

export default function AddRemoveFriend({friendsId}){

const [allFriends, setAllFriends] = useState(false)
const [friendRefresh, setFriendRefresh] = useState(false)
const [isFriend, setIsFriend] = useState(null)
const [allRequestsSent, setAllRequestsSent] = useState(null)
const [requestSent, setRequestSent] = useState(false)
const handleAddFriend = async () =>{
    const status = await modifyFriendRequest("add",friendsId)
    console.log(status)
    setFriendRefresh(!friendRefresh)
    return status
}

const handleRemoveFriend = async () =>{
    const status = await modifyFriendsList("remove",friendsId)
    console.log(status)
    setFriendRefresh(!friendRefresh)
    return status
}


useEffect(() =>{
    const getAllFriends = async () =>{
        const apiJSON = await getFriends()
        setAllFriends(apiJSON)
        return apiJSON
    }
    const getAllSentRequests = async () =>{
      const apiJSON = await getFriendRequestsSent()
      setAllRequestsSent(apiJSON)
      return apiJSON
    }
    getAllFriends()
    getAllSentRequests()
},[friendRefresh])

useEffect(() => {
    if (allFriends === null) return

    if (allFriends.message === "You have no friends.") {
      setIsFriend(false);
    } else if (allFriends.message === "friends") {
      const ifFriend = allFriends.friends.some((friend) => friend.id === Number(friendsId))
      setIsFriend(ifFriend);
    }
    if (allRequestsSent === null) return
    if (allRequestsSent.message === 'You have no requests pending.') {
      setIsFriend(false)
    } else if (allRequestsSent.message === 'friends pending'){
      const requestSent = allRequestsSent.friend_requests.some((friend) =>friend.id === Number(friendsId))
      setRequestSent(requestSent)
    }
  }, [allFriends, friendsId, allRequestsSent]);


return(<div className="addRemoveFriend">

        {isFriend === null? null:  isFriend ?
        <button onClick={handleRemoveFriend}>remove friend</button>
        :
        requestSent ?" friend request sent":

        <button onClick={handleAddFriend}>add friend</button>
        
        }
        
        </div>
    )
}