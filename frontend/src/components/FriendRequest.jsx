import { modifyFriendsList, modifyFriendRequest } from "../api/backend_calls"

import { useEffect, useState } from "react"


export default function FriendRequest({friend, requestRefresh}){

  

    const handleAddFriend = async () =>{
        const status = await modifyFriendsList("add",friend.id)
        console.log(status)
        requestRefresh()
        return status
    }
    const handleDeny= async () =>{
        const status = await modifyFriendRequest("remove", friend.id)
        console.log(status)
        requestRefresh()
        return status
    }

    return(<>
    <p>{friend.username}</p>
    <button onClick={()=>{handleAddFriend()}}>accept</button>
    <button onClick={()=>{handleDeny()}}>deny</button>
    </>)
}