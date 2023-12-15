import {useState} from 'react'
import {ProfileCard} from "../components/common/profileCard/ProfileCard"
import {ProfileEdit} from "../components/common/profileEdit/ProfileEdit"


export const ProfileComponent = ({ currentUser })=> {
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
}