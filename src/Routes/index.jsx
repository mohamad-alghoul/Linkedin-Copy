import { Login } from "../pages/Login"
import { createBrowserRouter } from "react-router-dom"
import { Regester } from "../pages/Regester"
import { HomeLayout } from "../layauts/HomeLayout"
import { ProfileLayout } from "../layauts/ProfileLayout"
import { ConnectionsLayout } from "../layauts/ConnectionsLayout"
export const router = createBrowserRouter([
  {
  path: "/",
  element: <Login />
}
,  {
  path: "/regester",
  element: <Regester/>
},
{
  path: "/home",
  element: <HomeLayout/>
},{
  
    path: "/profile",
    element: <ProfileLayout />
  
},
  {
    path: "/connections",
    element: <ConnectionsLayout />
},
])
