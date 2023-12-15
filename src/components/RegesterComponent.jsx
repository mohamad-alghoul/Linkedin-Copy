

import  { useState } from "react";
import { RegisterAPI,GoogleSignInAPI } from "../ApI/AuthAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { postUsersData } from "../ApI/FirestoreAPI";
import { getUniqueID } from "../components/common/helpers/uuid";


export default function RegisterComponent() {
 let navigate = useNavigate();

  const [credentails, setCredentials] = useState({});

  
  const register = async () => {
    try {
      let res = await RegisterAPI(credentails.email, credentails.password);

      postUsersData({
        name:credentails?.name,
        email:credentails?.email,
        userID:getUniqueID(),
        imageLink:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    })
      
      localStorage.setItem("userEmail",res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };
 

  const googleSignIn = () => {
    try {
    let res =  GoogleSignInAPI();
    navigate("/home");
      toast.success("Sigined In ! with Google!");
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Sign with google ");
    }
  }

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading-register">Make the most of your professional life</h1>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, name: event.target.value })
            }
            type="text"
            className="common-input"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or phone number"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
      <GoogleButton className="google-btn" onClick={googleSignIn}/>
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span onClick={()=> navigate("/")} className="join-now" >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
