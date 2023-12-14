import { useEffect, useState } from "react"
import { changeClubBook, profilePage } from "../api/backend_calls"

export default function ChangeClubBook({setIsChangingBook, clubPk}){

const [profileInfo, setProfileInfo] = useState(false)
const [selectedOption, setSelectedOption] = useState("completed_books")
const [bookPk, setBookPk] = useState(false)


const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); 
  };
const handleSelectChange = (e) => {
    setBookPk(e.target.value); 
  };

const handleChangeBook = async () =>{

    const modifier="changeBook"
    const results = await changeClubBook(clubPk, modifier, bookPk)
    setIsChangingBook(false)
}

useEffect(() => {
    const getProfile = async () => {
    const apiJSON = await profilePage();
    setProfileInfo(apiJSON)
    return apiJSON
    }
    
        getProfile()
    }, []);
    return(<>
    Change Book
    {profileInfo ?(<>
    <p className="custom-radio">From List
        <label>
          <input type="radio" 
          name="clubStatus" 
          value="completed_books" 
          checked={selectedOption === 'completed_books'} 
          onChange={handleOptionChange}/>
          Completed
        </label>
        <label>
          <input type="radio" 
          name="clubStatus" 
          value="tbr" 
          checked={selectedOption === 'tbr'} 
          onChange={handleOptionChange}/>
          To-Be-Read
        </label>
        </p>
        <br />
        <div className="custom-select">

        <label>
        Book
        <select onChange={handleSelectChange} required value={bookPk}>
        <option value="" >- Select A Book -</option>
        {profileInfo && profileInfo[selectedOption].map((book,index)=>(
          <option value={book.book.id} key={index}>{book['book']['title']}</option>
          ))}
        </select>
          </label>
        </div>
        <br />
        <button onClick={handleChangeBook} className="myButton">Change Book</button>
        </>):null}
        <button onClick={()=>{console.log(profileInfo)}}>print</button>
    </>)
}