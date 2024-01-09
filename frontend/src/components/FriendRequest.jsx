import { modifyFriendsList } from "../api/backend_calls"
import { useEffect, useState } from "react"


export default function FriendRequest({friend}){

    const [friendRefresh, setFriendRefresh] = useState(false)

    const handleAddFriend = async () =>{
        const status = await modifyFriendsList("add",friend.id)
        console.log(status)
        setFriendRefresh(!friendRefresh)
        return status
    }

    return(<>
    <button onClick={()=>{handleAddFriend()}}>accept</button>
    </>)
}