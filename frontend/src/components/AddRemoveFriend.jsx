import { useEffect, useState } from "react"
import { getLeaderboard, modifyFriendsList, getFriends } from "../api/backend_calls"

export default function AddRemoveFriend({friendsId}){
const [allUsers, setAllUsers] = useState(false)
const [allFriends, setAllFriends] = useState(false)
const [friendRefresh, setFriendRefresh] = useState(false)


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
    const getUsers = async () => {
    const apiJSON = await getLeaderboard();
    setAllUsers(apiJSON)
    return apiJSON
    }

        getUsers()
    }, []);

    return(<div className="addRemoveFriend">


            <button onClick={handleAddFriend}>add friend</button>
            <button onClick={handleRemoveFriend}>remove friend</button>
            <button onClick={()=>{console.log(allUsers, allFriends)}}>print</button>
            </div>
        )
}