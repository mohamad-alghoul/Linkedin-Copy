
import LinkedinLogo from "../../../assets/linkedinLogo.png";

import { FaHome, FaSearch , FaUsers  } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
import { ProfilePopup } from "../userPupop/UserPupop"
import { useEffect, useState } from "react";
import { SearchInput } from "../saerchInput/SearchInput";
import { getAllUsers } from "../../../api/FirestoreAPI" ;


export const  Navbar =({currentUser}) =>{

  const [showPupop,setShowPupop]= useState(false)
  const [isSearch,setIsSearch]= useState(false)
 const [searchInput,setSearchInput]= useState("")
const [users,setUsers]= useState([])
const [filteredUsers,setFilteredUsers]= useState([])


  let navigate = useNavigate()

  const goToRoute = (route) => {
    navigate(route)
  }

useEffect(()=>{
  getAllUsers(setUsers)
},[])

const handleSearch = () => {
  if (searchInput !== "") {
    let searched = users.filter((user) => {
      return user.name
        .toString()
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });
   //searched is an array

    setFilteredUsers(searched);
  } else {
    setFilteredUsers(users);
  }
};

useEffect(() => {
  let debounced = setTimeout(() => {
    handleSearch();
  }, 500);

  return () => clearTimeout(debounced);
}, [searchInput]);



function openUser(user){
  navigate("/profile", {
    state: { id: user?.id, email: user.email },
  })
} 

  return (
    <div className="topbar-main">
      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
{/* this condtion is show if search arrae if is true and show the rest of icons if false */}
   {isSearch ? <SearchInput setIsSearch={setIsSearch} setSearchInput={setSearchInput} /> :

        <div className="react-icons">
          <FaSearch
            size={20}
            className="react-icon"
           onClick={()=>setIsSearch(true)}
          />
          <FaHome
            size={20}
            className="react-icon"
            onClick={()=> goToRoute("/home")}
          />
          <FaUsers
            size={20}
            className="react-icon"
            onClick={()=> goToRoute("/connections")}
          />
          <MdWork size={20} className="react-icon" />
          <FaMessage size={20} className="react-icon" />
          <IoMdNotifications size={20} className="react-icon" />
        </div>}
       <img
        className="user-logo"
        src={currentUser?.imageLink}
        alt="user"
        onClick={()=>setShowPupop(!showPupop)}
      />
     { showPupop ?
     ( <div   className="popup-position" > 
     <ProfilePopup />
     </div> ): null }

{/* if the the input empty */}
{searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)} key={user.id}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
