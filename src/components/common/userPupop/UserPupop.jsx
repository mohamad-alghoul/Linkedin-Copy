import "./userpupop.scss"
import  { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../ApI/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import { Button } from "../button/Button";


export  const ProfilePopup=() =>{
  
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
// send the info from firestore back to hier using function getCurrentUser and set it to setCurrentUser 
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  
  return (
    <div className="popup-card">
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.id,
            },
          })
        }
      />
      <Button title="Log out" onClick={onLogout} />
    </div>
  );
}
