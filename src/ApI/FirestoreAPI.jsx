import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatus = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


export const getSingleStatus=(setAllStatus,id)=>{
  
 const sigleStatusQuery= query(postsRef,where("userID", "==",id))
 onSnapshot(sigleStatusQuery, (response) => {
  setAllStatus(
    response.docs.map((docs) => {
      return {...docs.data(), id: docs.id };
    })
  );
 })
}

export const getSingleUser=(setCurrentUser,email)=>{

  const singleUserQuery= query(userRef,where("email", "==",email))
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return {...docs.data(), id: docs.id };
      })[0]
    );
  })
}

export const postUsersData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);
console.log(userID)
  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

//set the like system in Firestore

export const likePost = (userId, postId,liked) => {
  try{
    let docTolike = doc(likeRef, `${postId}_${userId}`);
// I checked if the post is already liked or not and if ja deleted
   if(liked){
  deleteDoc(docTolike)
   }else{
    setDoc(docTolike,{postId,userId});
   }

  }  catch (err) {
  console.log(err);
}
};

//get the like system from Firestore
export const getLikesByUser = (userId, postId,setLiked ,setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};


//set the comment system in Firestore
export const postComment =(postId, comment,timeStamp,name)=>{
try{
  addDoc(commentsRef, {
    postId, 
    comment,
    timeStamp,
    name
  })
} 
catch (err) {
  console.log(err);
}
}
//get the comment system from Firestore
export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

//update the post 


export const updatePost = (id, status,postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status,postImage});
    toast.success("Post has been updated!");
  } catch (err) {
    console.log(err);
  }
};

//delete the post
export const deletePost = (id) => {
  let docToUpdate = doc(postsRef, id);
  try {
       deleteDoc(docToUpdate);
    toast.success("Post has been deleleted!");
  } catch (err) {
    console.log(err);
  }
};

// add the Connection to the fireStore
export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Connection Added!");
  } catch (err) {
    console.log(err);
  }
};

// get the connection from the fireStore
export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      // If the connection between this ueser are connected or not connected
      const isConnected = connections.some((connection) => connection.userId === userId );
// if ja make it true
      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};