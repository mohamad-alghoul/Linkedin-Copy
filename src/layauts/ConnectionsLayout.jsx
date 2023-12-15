import {useMemo,useState} from 'react'
import { Navbar } from "../components/common/topbar/Navbar"
import { Connections } from '../pages/Connection';
import { getCurrentUser } from "../ApI/FirestoreAPI";

export const ConnectionsLayout = () => {
const [currentUser,setCurrentUser] = useState({});

 useMemo(()=>{
    getCurrentUser(setCurrentUser)
  },[])
  return (
    <div>
      <Navbar currentUser={currentUser}  />
      <Connections currentUser={currentUser} />
    </div>
  )
}
