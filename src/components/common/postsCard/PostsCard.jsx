import "./postsCard.scss";
import { useMemo, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import { LikeButton } from "../likeButton/LikeButton";
import {
   getCurrentUser
  ,getAllUsers
  ,deletePost
  ,getConnections 
} from "../../../api/FirestoreAPI";
import { Modal } from "antd";


export const PostsCard = ({ posts,id ,getEditData}) => {
 
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);


  // this condition is about just the user that is connected can see the post each aother 



  return isConnected || currentUser.id === posts.userID ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
      
{/* if it is not the current user we cant updat the post 
console.log(currentUser.id)
console.log(posts.userID)
*/}
        {currentUser.id === posts.userID ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}

        <img
          alt="profile-image"
          className="profile-image"
          src={
            allUsers
              .filter((user) => user.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
        />
        <div>
          <p
            className="name"
            onClick={() =>
               // when  we  click ,we go to thet profile that contains this post with this id and this email

              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className="headline">
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}

      {/* this whene i wont to write with brake line  */}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />


{/* this modal in order to open the image in separete Modal window */}
      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}