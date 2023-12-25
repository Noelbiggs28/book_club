import { useEffect, useState } from "react"
import { modifyFriendsList, getFriends } from "../api/backend_calls"

export default function AddRemoveFriend({friendsId}){

const [allFriends, setAllFriends] = useState(false)
const [friendRefresh, setFriendRefresh] = useState(false)
const [isFriend, setIsFriend] = useState(null)


const handleAddFriend = async () =>{
    const status = await modifyFriendsList("add",friendsId)
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
    getAllFriends()
},[friendRefresh])

useEffect(() => {
    if (allFriends === null) return

    if (allFriends.message === "You have no friends.") {
      setIsFriend(false);
    } else if (allFriends.message === "friends") {
      const ifFriend = allFriends.friends.some((friend) => friend.id === Number(friendsId))
      setIsFriend(ifFriend);
    }
  }, [allFriends, friendsId]);


return(<div className="addRemoveFriend">

        {isFriend === null? null:  isFriend ?
        <button onClick={handleRemoveFriend}>remove friend</button>
        :
        <button onClick={handleAddFriend}>add friend</button>
        }
        {/* <button onClick={()=>{console.log(allFriends, allFriends.friends, friendsId)}}>print</button> */}
        </div>
    )
}