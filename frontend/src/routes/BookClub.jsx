import { useState, useEffect } from "react"
import { createBookClub, profilePage, getAllBookClubs, getAllMyClubs } from "../api/backend_calls"
import CreateBookClubComponent from "../components/CreateBookClub";
import SelectedBookClub from "../components/SelectedBookClub";
import ClubComponent from "../components/ClubComponent";
import './css/bookClub.css'
export default function BookClub() {
  const [bookClubs, setBookClubs] = useState(false)
  const [bookClubSelected, setBookClubSelected] = useState(false)
  const [creatingBookClub, setCreatingBookClub] = useState(false)
  const [myClubs, setMyClubs] = useState(false)
  const [searchAllClubs, setSearchAllClubs] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [myID, setMyID] = useState(false)

  const handleClubClick = (club) =>{
    setBookClubSelected(club)
    console.log(club)
  }

  const toggleCreatingBookClub = () =>{
    setCreatingBookClub(!creatingBookClub)
  }

  const handleSearchClubsChange = (e) =>{
    setSearchAllClubs(e.target.value)
  }
  const handleOptionChange = (e) =>{
    setSearchType(e.target.value)
  }
  useEffect(() => {
    const fetchBookClubs = async () => {
        const bookClubsEntries = await getAllBookClubs()
        setBookClubs(bookClubsEntries);
        setMyID(bookClubsEntries.myid)
    };
    const fetchAllMyClubs = async () => {
      const myBookClubsEntries = await getAllMyClubs()
      setMyClubs(myBookClubsEntries);
 
  };
    fetchAllMyClubs()
    fetchBookClubs()
}, [bookClubSelected, creatingBookClub])

return (
  <div id="clubPage">
    {bookClubSelected ? (
      <SelectedBookClub myID={myID} bookClubSelected={bookClubSelected} setBookClubSelected={setBookClubSelected}/>
    ) : (
      <>
      <div className="genericBox" id="welcome">

        <div>Welcome to your Book Clubs</div>
        <button onClick={() => toggleCreatingBookClub()}>
          Create Book Club
        </button>
      </div>
        
        {creatingBookClub ? <CreateBookClubComponent toggleCreatingBookClub={toggleCreatingBookClub}/>:(<>
        
        <div className="genericBox" id="clubLeader">
        <h3>
          books clubs i made
        </h3>
        {bookClubs && bookClubs.result &&
          bookClubs.result.filter(club=>club['user']===myID).map((club, index) => (
            <div onClick={() => handleClubClick(club)} key={index}>
              <ClubComponent clubName={club['name']} bookTitle={club['book']['title']} />
              
        </div>
        ))}
      </div>

      <div className="genericBox" id="clubMember">
        <h3>
          book clubs im a member of
        </h3>
        {myClubs &&
          myClubs.result.map((club, index) => (
            <div onClick={() => handleClubClick(club)} key={index}>
              <ClubComponent clubName={club['name']} bookTitle={club['book']['title']} />
        </div>
        ))}
        </div>
        <div className="genericBox" id="allClubs">

        <h3>
          all books clubs
        </h3>
        <h3>

        Search Clubs: <input type="text" value={searchAllClubs} onChange={handleSearchClubsChange} placeholder="Enter club name"/>
          </h3>
        <p>search by: 
        <label>
          <input type="radio" 
          name="searchtype" 
          value="name" 
          checked={searchType === 'name'} 
          onChange={handleOptionChange}/>
          Club name
        </label>
        <label>
          <input type="radio" 
          name="searchtype" 
          value="title" 
          checked={searchType === 'title'} 
          onChange={handleOptionChange}/>
          book title
        </label>
        </p>

        {bookClubs && bookClubs.result &&
          bookClubs.result.filter((club)=>
          (searchType==="name"? club["name"]:club['book']['title']).toLowerCase()
          .includes(searchAllClubs.toLowerCase()))
          .map((club, index) => (
            <div onClick={() => handleClubClick(club)} key={index}>
                <ClubComponent clubName={club['name']} bookTitle={club['book']['title']} />
              </div>
          ))}
        <button onClick={() => console.log(myClubs)}>Print</button>
          </div>
      </>
    )}
          </>)}
  </div>
)}