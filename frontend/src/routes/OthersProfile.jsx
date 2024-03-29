import { useParams } from 'react-router-dom';
import { profilePage, getMemberClubs, getUserPagesCompleted, getFriends, modifyFriendsList } from '../api/backend_calls';
import { useEffect, useState } from 'react';
import ReadOnlyRating from '../components/readOnlyRating';
import SelectedBookClub from '../components/SelectedBookClub';
import { getAllBookClubs } from '../api/backend_calls';
import DetailedBookView from "../components/DetailedBookView";
import AddRemoveFriend from '../components/AddRemoveFriend';
import './css/othersProfile.css';
export default function OthersProfile() {
    const [profileInfo, setProfileInfo] = useState(null);
    const [clubInfo, setClubInfo] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [myID, setMyId] = useState(false)
    const [clubSelected, setClubSelected] = useState(false)
    const { userPK } = useParams();
    const [open, setOpen] = useState(false);
    const [clickedBook, setClickedBook] = useState({})
    const [myFriends, setMyFriends] = useState(false)

    const handleClubClick =(club) =>{
        setClubSelected(club)
    }

    const handleOpen = (book) => {
        setClickedBook(book)
        setOpen(true);
      }

    useEffect(() => {
        const fetchProfileInfo = async () => {
            const profile = await profilePage(userPK);
            const clubs = await getMemberClubs(userPK)
            const userData = await getUserPagesCompleted(userPK)
            const userID = await getAllBookClubs()
            const friends = await getFriends()
            setMyFriends(friends)
            setMyId(userID.myid)
            setProfileInfo(profile);
            setClubInfo(clubs)
            setUserInfo(userData)
        };

        fetchProfileInfo();
    }, [clubSelected]);
    if(clubSelected){
        return <div className='clubPage'>
            <SelectedBookClub  myID={myID} bookClubSelected={clubSelected} setBookClubSelected={setClubSelected}/>
            </div>
    }
    else
        return (
    <div className="othersPage">
                <DetailedBookView open={open} setOpen={setOpen}  buttons={true} onClose={() => setOpen(false)} bookInfo={clickedBook}/>
            {userInfo ? (
                <>    
                <div className="otherTitle">
                    <h2>{userInfo.username}'s Profile</h2>
                </div>
                <AddRemoveFriend friendsId={userPK} />
                <div className="otherHeaderContainer">
                    <div className="totalPages">
                        <h3>Total Pages Read:</h3>
                        <h3>{userInfo.pages_completed}</h3>
                    </div>
                    <div className="othersRecommended">
                        <h3>Recommended</h3>
                        <div className="othersScroll">
                            {profileInfo && profileInfo.recommended.length >0 ? profileInfo.recommended.map((book, index) => (
                                <p className='othersBookClubs' onClick={() => handleOpen(book.book)} key={index}>{book.book.title}</p>
                                )):<p>No recommended books available</p>} 
                        </div>
                    </div>
                </div>
            </>) : (<p>Loading...</p>)}

            <div className='othersBottomContainer'>
                <div className="completedAndTbr">
                    <div className='bookListBlock'>
                        <h3>Completed</h3>
                        {profileInfo && profileInfo.completed_books.map((book, index) => (
                            <div key={index} className="othersCompleted" onClick={() => handleOpen(book.book)}>
                                <div  key={index}>{book.book.title} <ReadOnlyRating value={book.user_rating}/></div>
                            </div>
                        ))}
                    </div>
                    <div className='bookListBlock'>
                        <h3>To Be Read</h3>
                        {profileInfo && profileInfo.tbr.map((book, index) => (
                        <p className='othersBookClubs' onClick={() => handleOpen(book.book)} key={index}>{book.book.title}</p>
                        ))}
                    </div>
                </div>
                <div className='othersClubsBlock'>
                    <h3>Clubs</h3> 
                    {clubInfo && clubInfo.result.map((club, index) => (
                    <div className='othersBookClubs' onClick={()=>{handleClubClick(club)}} key={index}>{club.name}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}
