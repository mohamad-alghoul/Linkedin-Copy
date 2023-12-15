import { useEffect, useState } from "react";
import "../Sass/connectionsComponents.scss"
import { ConnectedUsers } from "./common/connectedUsers/ConnectedUsers";
import { getAllUsers, addConnection } from "../ApI/FirestoreAPI"

export const ConnectionsComponents= ({currentUser}) => {


  const [users, setUsers] = useState([]);

  
  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };


  useEffect(() => {
    getAllUsers(setUsers);
  }, []);


 
  
  return users.length > 1 ? (
    <div className="connections-main" key={currentUser.id}>
                {/* this condition mean  shoud not show current user because i cant make connection with my self */}
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
            key={currentUser.id}
          />
        );
      })}
    </div>
  ) : (
    <div className="connections-main"> <p> No Connections to Add!</p></div>
  );
  

}

