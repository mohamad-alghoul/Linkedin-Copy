
import { Button, Modal, Progress } from "antd";
import "./modal.scss"
import {AiOutlinePicture} from "react-icons/ai"
import{uploadPostImage} from "../../../ApI/ImageUpload"
import ReactQuill from "react-quill";

export const ModalComponent = ({
  modalOpen
  ,setModalOpen,
  status,
  setStatus,
  sendStatus,
  isEdit,
  updateStatus,
  setPostImage,
  postImage,
 progress,
 setProgress,
 setCurrentPost,
 currentPost
}) => {

  return (
    <>
 
      <Modal
       title="Start a Post"
       centered
        open={modalOpen}
        onOk={() => {
          setStatus("")
          setModalOpen(false)
          setPostImage("")
          setCurrentPost({});
        }
        }
        onCancel={() =>
          {
          setStatus("")
          setModalOpen(false)
          setPostImage("")
          setCurrentPost({});
        }}
        footer={[
          <Button 
          key="submit" 
          type="primary" 
           disabled={status.length > 0 ? false : true} 
           onClick={ isEdit ?updateStatus :sendStatus}
           >
           { isEdit ? "Update" :"Post"}
             </Button>
        ]}
      >
      <div className='posts-body'>
      {/* this is a redy disabled text field using reacrt quill  */}
      <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            placeholder="Share Something Useful.."
            onChange={setStatus}
          />

{progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
        </div>
        <label htmlFor="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};
