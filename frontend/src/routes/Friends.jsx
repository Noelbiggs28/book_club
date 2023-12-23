import { getFriends } from "../api/backend_calls"
import { useEffect, useState } from "react"

export default function FriendsPage(){
    const[friendsList, setFriendsList] = useState(false)


    useEffect(() => {
        const fetchFrindsList = async () => {
            const friends = await getFriends()
            setFriendsList(friends)
        };
        fetchFrindsList()
    }, [])

    return(<>
    friends
    </>)
}