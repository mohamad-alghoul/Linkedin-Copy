import { PostUpDate } from "./common/postupDate/PostUpDate"


export const HomeComponent = ({currentUser}) => {
  return (
    <div>
      <PostUpDate  currentUser={currentUser}/>
    </div>
  )
}
