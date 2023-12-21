import { useEffect, useState } from "react"
import { getLeaderboard } from "../api/backend_calls"

export default function AddRemoveFriend({friendsId}){
const [allUsers, setAllUsers] = useState(false)

useEffect(() => {
    const getUsers = async () => {
    const apiJSON = await getLeaderboard();
    setAllUsers(apiJSON)
    return apiJSON
    }
    
        getUsers()
    }, []);

    return(<>
        
        </>)
}