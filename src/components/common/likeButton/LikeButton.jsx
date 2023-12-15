import "./likeButton.scss";
import { likePost, getLikesByUser, postComment ,getComments } from "../../../api/FirestoreAPI";
import { AiOutlineLike, AiFillLike, AiOutlineComment} from "react-icons/ai";
import { useMemo, useState } from "react";
import {getCurrentTime } from "../../common/helpers/useMoment";

export const LikeButton = ({ userId, postId,currentUser }) => {

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  //send and get the like system from Firestore

  function HandleLikeButton() {
    likePost(userId, postId, liked);
  }
  useMemo(() => {
    getLikesByUser( userId,postId, setLiked, setLikesCount);
    getComments(postId, setComments);
  }, [userId, postId]);



//send and get the comment system from Firestore
function addComment() {
  postComment( postId, comment,getCurrentTime("LLL"),currentUser?.name);
  setComment("")
}



  return (
    <div className="like-container">
      <p>{likesCount} people like</p>

      <div className="hr-line">
        <hr />
      </div>

      <div className="like-comment">
        <div className="likes-comment-inner" onClick={HandleLikeButton}>
          {liked ? (
            <AiFillLike size={30} color="blue" />
          ) : (
            <AiOutlineLike size={30} />
          )}
          <p className={liked ? "blue" : "black"}>like</p>
        </div>

        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          <AiOutlineComment
            size={30}
            color={showCommentBox ? "blue" : "#212121"}
          />
          <p className={liked ? "blue" : "black"}>Comment</p>
        </div>
      </div>

      {showCommentBox ? (
        <>
          <input
            onChange={(event) => setComment(event.target.value)}
            className="comment-input"
            placeholder=" Add A Comment"
            name="comment"
            value={comment}
          />
          <button onClick={addComment} className="add-comment-btn">Add Comment</button>


          {comments.length> 0 ? comments.map(comment =>{
            
        return <div key={comment.id} className="all-comments">
  
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>
                  <p className="timestamp">{comment.timeStamp}</p>
           </div>
      })
      : null}
        </>
      ) : null}

    </div>
  );
};
