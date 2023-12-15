import {useMemo,useState} from 'react'
import { Navbar } from "../components/common/topbar/Navbar"
import {getCurrentUser} from "../ApI/FirestoreAPI";
import { Profile } from '../pages/Profile';

export const ProfileLayout = () => {
const [currentUser,setCurrentUser] = useState({});

 useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  )
}
