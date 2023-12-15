import { useState,useMemo} from 'react'
import  {ModalComponent}  from '../modal/ModalComponent'
import "./postupDate.scss"
import { postStatus ,getStatus,updatePost} from "../../../api/FirestoreAPI"
import { PostsCard } from '../postsCard/PostsCard'
import { getCurrentTime } from '../helpers/useMoment'
import { getUniqueID } from "../helpers/uuid"

export const PostUpDate = ({currentUser}) => {


const [modalOpen, setModalOpen] = useState(false)
const [status, setStatus] = useState("")
const [allStatuses, setAllStatus] = useState([])
const [isEdit, setIsEdit] = useState(false)
const [currentPost, setCurrentPost] = useState({})
const [postImage, setPostImage] = useState("")
const [progress, setProgress] = useState(0)
 


const sendStatus = async() => {
 let  object = {
    status:status,
    timeStamp:getCurrentTime("LLL"),
    postID:getUniqueID(),
    userName :currentUser?.name,
    userEmail:currentUser?.email,
    userID: currentUser?.id,
    postImage :postImage
  }

 await postStatus(object)
 await setModalOpen(false)
 setIsEdit(false)
 await setStatus("")

}



const getEditData = (posts)=>{
  setModalOpen(true)
  setStatus(posts.status)
  setIsEdit(true)
  setCurrentPost(posts)
 }

const updateStatus=()=>{
  updatePost(currentPost.id,status,postImage)
  setModalOpen(false)
}


useMemo(()=>{
  getStatus(setAllStatus)
},[])

  return (
           <div className="post-status-main">
                <div className="user-details">
                   <img src={currentUser?.imageLink} alt="imageLink" />
                      <p className="name">{currentUser?.name}</p>
                      <p className="headline">{currentUser?.headline}</p>
                 </div>

      <div className="post-status">
        <img
          className="post-image"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
{/* the button for the open the modal       */}
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      
      </div>
           <ModalComponent
         modalOpen={modalOpen} 
         setModalOpen={setModalOpen}
         status={status}
         setStatus={setStatus}
         sendStatus={sendStatus}
         isEdit={isEdit}
         updateStatus={updateStatus}
         setPostImage={setPostImage}
         postImage={postImage}
         progress={progress}
         setProgress={setProgress}
         setCurrentPost={  setCurrentPost}
            />
    <div>
        {allStatuses.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData}  />
            </div>
          );
        })}
      </div>

         </div>
        )
}
