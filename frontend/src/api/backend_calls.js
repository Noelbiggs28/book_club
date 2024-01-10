// different fetchs
async function getDeleteFetch(adjustable_url, method){
  const common_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";
  const payload = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },}
  const url = common_url+adjustable_url
  if(method==="GET"){
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  else if(method==="DELETE"||method==="PUT"){
    const response = await fetch(url, payload);
    return response
  }
}

async function contextFetch(adjustable_url, method, context){
  const common_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";
  const payload = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(context)
  }
  const url = common_url+adjustable_url
  const res = await fetch(url, payload)
  const body = await res.json()
  return body
}

async function noTokenFetch(adjustable_url, context) {
  const common_url = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/";
  const payload = {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(context)
  }
    const url = common_url+adjustable_url
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }

// signup and login
  export async function signup(context) {
      const adjustable_url = `accounts/signup/`
      const body = await noTokenFetch(adjustable_url,context)
    return body
  }
  
  export async function login(context) {
    const adjustable_url = `accounts/get-token`
    const body = await noTokenFetch(adjustable_url, context)
    return body.token
  }

// all the calls
  export async function saveToList(context, list) {
    const adjustable_url= `book-list/${list}/`
    const apiJSON = await contextFetch(adjustable_url, "POST", context)
    return apiJSON
  }

  export const fetchBooks = async (context, searchType, result_page) => {
    let useableContext = context.title.replace(/ /g, "+")
      let adjustable_url;
      if (searchType === "author") {
        adjustable_url = `search/author/?author=${useableContext}`;
      } else if (searchType === "title") {
        adjustable_url = `search/title/?title=${useableContext}}`;
      }
      else {
        const subjects = context.title.split(' ');
        const formattedSubjects = subjects.map(subject => `subject:${subject}`);
        const subjectContext = formattedSubjects.join('+');
        adjustable_url = `search/subject/?subject=${subjectContext}&resultpage=${result_page}`
      }
      const apiJSON = await getDeleteFetch(adjustable_url, "GET");
      return apiJSON.docs
  };


  export const profilePage = async (pk=null) => {
    let profilepk = '/'
    if(pk!==null){
      profilepk=`/${pk}`
    }
    const adjustable_url =`book-list${profilepk}`
    const apiJSON = await getDeleteFetch(adjustable_url, "GET")
    return apiJSON
  };
  
  export const fetchDetailedBook = async (OLID) => {
      let adjustable_url = `search/detail/?OLID=${OLID}`;
      const apiJSON = await getDeleteFetch(adjustable_url, "GET")
      return apiJSON
  };

  export const setRatings = async (pk, rating) => {
    const context = {"rating": rating}
      let adjustable_url = `book-list/completed/${pk}/`;
      const apiJSON = await contextFetch(adjustable_url, "PATCH", context)
      return apiJSON 
  };

  export const fetchOtherUsersSameBook = async (OLID) => {
      let adjustable_url = `book-list/others-completed/${OLID}`;
      const apiJSON = await getDeleteFetch(adjustable_url, "GET")
      return apiJSON
  };

  export const createBookClub = async (bookPk, bookClubName) =>{
    const context= {"book" : bookPk, "name" : bookClubName}
    let adjustable_url = `book-club/`;
    const apiJSON = await contextFetch(adjustable_url, "POST", context)
    return apiJSON
  }

  export const getAllBookClubs = async (pk = null) =>{
    let bookClubPk = ''
    if(pk !==null){
      bookClubPk = `${pk}`
    }
    let adjustable_url = `book-club/${bookClubPk}`;
    const apiJSON = await getDeleteFetch(adjustable_url, "GET")
    return apiJSON
  }

  export const modifyClub = async (clubPk, modifier) =>{
    const context= {"modifier":modifier}
    let adjustable_url = `book-club/${clubPk}`;
    const apiJSON = await contextFetch(adjustable_url, "PATCH", context)
    return apiJSON
  }

  export const changeClubBook = async (clubPk, modifier, bookPk) =>{
    const context= {"modifier":modifier,"bookPk":bookPk}
    let adjustable_url = `book-club/${clubPk}`;
    const apiJSON = await contextFetch(adjustable_url, "PATCH", context)
    return apiJSON
  }
  export const getAllMyClubs = async () =>{
    let adjustable_url = `book-club/myclubs`;    
    const apiJSON = await getDeleteFetch(adjustable_url,"GET")
    return apiJSON
  }

  export const getPagesCompleted = async () =>{
    let adjustable_url = `accounts/page-amount/`;
    const apiJSON = await getDeleteFetch(adjustable_url,"GET")
    return apiJSON
  } 
  
  export const getUserPagesCompleted = async (userID) =>{
    let adjustable_url = `accounts/page-amount/${userID}`;
    const apiJSON = await getDeleteFetch(adjustable_url, "GET")
    return apiJSON
  }

  export const updatePagesCompleted = async (context) =>{
    let adjustable_url = `accounts/page-amount/`;
    const apiJSON = await contextFetch(adjustable_url, "POST", context)
    return apiJSON
  }

  export const decreasePagesCompleted = async (context) =>{
    let adjustable_url = `accounts/page-decrease/`;
    const apiJSON = await contextFetch(adjustable_url, "POST", context)
    return apiJSON
  }

export const deleteCompletedBook = async (completedBookId) => {
  let adjustable_url=`book-list/completed/${completedBookId}/`
  const response = await getDeleteFetch(adjustable_url, "DELETE")
  return response
}

export const tbrDelete = async (tbrBookId) => {
  let adjustable_url=`book-list/to-be-read/${tbrBookId}/`
  const response = await getDeleteFetch(adjustable_url, "DELETE")
  return response
}
export const getBookClubMessageBoard = async (clubPk) =>{
  let adjustable_url = `book-club/message-board/${clubPk}`;
  const apiJSON = await getDeleteFetch(adjustable_url, "GET")
  return apiJSON
}

export const addClubMessage = async (clubPk, message) =>{
  const context ={"message":message}
  let adjustable_url = `book-club/message-board/${clubPk}`;
  const apiJSON = await contextFetch(adjustable_url, "POST", context)
  return apiJSON
}

export const deleteMessage = async (messagePk) =>{
  let adjustable_url = `book-club/message-board/${messagePk}`;
  const apiJSON = await getDeleteFetch(adjustable_url, "DELETE")
  return apiJSON
}

export const deleteMyClub = async (clubPk) =>{
  let adjustable_url = `book-club/${clubPk}`;
  const apiData = await getDeleteFetch(adjustable_url, "DELETE")
  return apiData
}

export const getMemberClubs = async (memberPK) =>{
  let adjustable_url = `book-club/clubs/${memberPK}`;
  const apiJSON = await getDeleteFetch(adjustable_url, "GET")
  return apiJSON
} 

// return list of all users as dictionarys with 
// username, pages_completed user_id
export const getLeaderboard = async () =>{
  let adjustable_url = `accounts/leaderboard/`;
  const apiJSON = await getDeleteFetch(adjustable_url, "GET")
  return apiJSON
} 

export const toggleRecommend = async (bookID) => {
  let adjustable_url=`book-list/completed/${bookID}/`
  const response = await getDeleteFetch(adjustable_url, "PUT")
  return response
}


// returns list of users that are friends
export const getFriends = async () =>{
  const adjustable_url = 'accounts/friend/'
  const apiJSON = await getDeleteFetch(adjustable_url, "GET")
  return apiJSON
} 

// confirms friend request and add them to your friends.
export const modifyFriendsList = async (action, friendsId) =>{
  const context= {"action":action,"friend_id":friendsId}
  let adjustable_url = `accounts/friend/`;
  const apiJSON = await contextFetch(adjustable_url, "PATCH", context)
  return apiJSON
}

// get all friend requests that were sent to you
export const getFriendRequests = async () =>{
  const adjustable_url = 'accounts/notifications/'
  const apiJSON = await getDeleteFetch(adjustable_url, "GET")
  return apiJSON
} 
// can add or remove a friend request from others point of view.
export const modifyFriendRequest = async(action, friendsId) =>{
  const context = {"action":action, "friend_id":friendsId}
  const adjustable_url = 'accounts/notifications/'
  const apiJSON = await contextFetch(adjustable_url, "PATCH", context)
  return apiJSON
}

// returns list of dictionarys of friends that you sent requests to
export const getFriendRequestsSent = async () =>{
  const adjustable_url = 'accounts/pending-requests/'
  const apiJSON = await getDeleteFetch(adjustable_url, "GET")
  return apiJSON
}