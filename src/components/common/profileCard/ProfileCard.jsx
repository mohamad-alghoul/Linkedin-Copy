
import "./profileCard.scss"
import  { useState, useMemo } from "react";
import { getSingleStatus, getSingleUser } from "../../../api/FirestoreAPI";
import  { PostsCard }from "../postsCard/PostsCard";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { UploadImage as uploadImageAPI } from "../../../ApI/ImageUpload";
import  { ModalImageUpload } from "../../common/modalImageUplod/ModalImageUplod";

export const ProfileCard =({ onEdit, currentUser })=> {

  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

 
function getImage(event){
  setCurrentImage(event.target.files[0]);
  
}


 
function uploadImage(){
  uploadImageAPI(
    currentImage
     ,currentUser?.id,
     setModalOpen,
     setProgress,
     setCurrentImage
     )
}



// this contains our data that we send it prevosly from postsCard 
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <>
      <ModalImageUpload
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />


      {/* this condition is about just the current user can  edit a neu info  */}
      <div className="profile-card">
        {currentUser?.id === location?.state?.id ? (
          <div className="edit-btn">
            <HiOutlinePencil className="edit-icon" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser?.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser?.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser?.headline
                : currentProfile?.headline}
            </p>
            {(currentUser?.city || currentUser?.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser?.city}, ${currentUser?.country} `
                  : `${currentProfile?.city}, ${currentUser?.country}`}
              </p>
            ) : (
              <></>
            )}
        
          </div>

          <div className="right-info">
            <p className="college">
              {Object.values(currentProfile).length === 0
                ? currentUser?.college
                : currentProfile?.college}
            </p>
            <p className="company">
              {Object.values(currentProfile).length === 0
                ? currentUser?.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className="about-me">
          {Object.values(currentProfile).length === 0
            ? currentUser?.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser?.skills || currentProfile?.skills ? (
          <p className="skills">
            <span className="skill-label">Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser?.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}
