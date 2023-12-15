import React,{useMemo,useState} from 'react'
import { Navbar } from "../components/common/topbar/Navbar"
import { Home } from '../pages/Home.jsx'
import { getCurrentUser } from "../ApI/FirestoreAPI";

export const HomeLayout = () => {
const [currentUser,setCurrentUser] = useState({});

 useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Home currentUser={currentUser} />
    </div>
  )
}
