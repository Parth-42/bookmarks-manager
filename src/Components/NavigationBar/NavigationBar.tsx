import firebase from "firebase";
import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import OutsideClickHandler from "react-outside-click-handler";
import { toast } from "react-toastify";
import TabNavTop from "../../CommonComponents/TabNavTop/tab-nav-top";
import "./NavigationBar.scss";

const NavigationBar = () => {
  const [toggleProfileDropdown, setToggleProfileDropdown] = useState(false);
  const user = firebase.auth().currentUser;
  const profileUrl = user?.photoURL!;

  function googleSignout() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          toast.success("Signout Successfull");
        },
        function (error) {
          toast.error("Signout Failed");
        }
      );
  }

  return (
    <nav>
      <div>LOGO</div>
      <div id="tab-nav-top">
        <TabNavTop className="tab-nav" onChangeHandler={() => {}} />
      </div>
      <div id="nav-right">
        <div id="notification-bell">
          <span>
            <BsBell />
          </span>
          <div id="notification-dot"></div>
        </div>

        <OutsideClickHandler
          onOutsideClick={() => setToggleProfileDropdown(false)}
        >
          <div
            id="user-profile"
            onClick={() => setToggleProfileDropdown(!toggleProfileDropdown)}
          >
            <div id="user-image">
              <img src={profileUrl} alt="" />
            </div>
            <div id="user-name">
              <p>{user?.displayName}</p>
              <span>
                <i className="fa fa-caret-down"></i>
              </span>
            </div>
          </div>
          {toggleProfileDropdown ? (
            <div id="user-dropdown">
              <button onClick={googleSignout}>Sign Out</button>
            </div>
          ) : (
            ""
          )}
        </OutsideClickHandler>
      </div>
    </nav>
  );
};

export default NavigationBar;
