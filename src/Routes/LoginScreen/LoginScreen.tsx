import React from "react";
import "./loginScreen.scss";
import { FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import LoginScreenImage from "../../assets/images/LoginScreen.svg";
import logo from "../../assets/images/logo.svg";
import GoogleAuth from "../../Services/auth/auth";
import { googleAuthProvider } from "../../Services/auth/authMethods";

const LoginScreen = () => {
  const history = useHistory();
  const currUser = firebase.auth().currentUser;

  const handleClick = async (provider: firebase.auth.GoogleAuthProvider) => {
    const res = await GoogleAuth(provider);
    console.log(res);

    if (currUser == null) {
      history.push("/Login");
    } else {
      history.push("/");
    }
  };

  return (
    <div className="login-screen-container">
      <div className="img-container">
        <img className="main-image" src={LoginScreenImage} alt="main" />
      </div>
      <div className="text-container">
        <img src={logo} alt="logo" />
        <h4 className="sub-heading">Log In to Your Account</h4>
        <div className="button-content">
          <button
            className="login-button"
            onClick={() => handleClick(googleAuthProvider)}
          >
            <FaGoogle className="google-img" />
            <span className="button-text">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
