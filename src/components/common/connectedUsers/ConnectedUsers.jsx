import { AiOutlineUsergroupAdd} from "react-icons/ai"
import { getConnections } from "../../../ApI/FirestoreAPI";
import {useState,useEffect} from "react"

export const ConnectedUsers = ({user,currentUser,getCurrentUser}) => {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);

  // this maen if the user is  connected  dont show it again

  return isConnected ? (
    <></>
  ) : (
    <div className="grid-child" >
      <img src={user.imageLink} />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button>
    </div>
  );
}
