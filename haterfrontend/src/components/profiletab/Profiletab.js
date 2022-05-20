import "./Profiletab.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "../../state/store.js";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let homeRoute = props.homeRoute;
  // Modal constants

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  let signOut = () => {
    let knoxToken = localStorage.getItem("knox");
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${knoxToken}`,
      },
      credentials: "include",
    };
    fetch(`https://haterbackend.herokuapp.com/user/logout`, options)
      .then((res) => {
        localStorage.clear();
        store.dispatch({ type: "set", payload: { name: "Guest" } });
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="profile" style={props.show}>
      <div className="top">
        <div className="exit" onClick={props.click}>
          x
        </div>
        <div className="propic">
          <img
            src={`https://avatars.dicebear.com/api/adventurer/${user.name}.svg?flip=1`}
          ></img>
        </div>
        <div className="tweetcount">
          <div className="account">{props.name}</div>
          <div className="proCountContainer"></div>
        </div>
      </div>
      {user.tag ? (
        <div className="bottom">
          <Link to={homeRoute} className="pronavs">
            <div className="protabLinks">Home</div>
          </Link>
          <Link to="/profile" className="pronavs">
            <div className="protabLinks">Profile</div>
          </Link>
          <a onClick={signOut} className="pronavs">
            <div className="protabLinks">Sign Out</div>
          </a>
        </div>
      ) : (
        <Link to="/" className="pronavs prohate nav-guest-signup">
          <div className="protabLinks nav-guest-signup-link">Sign Up 🦩</div>
        </Link>
      )}
    </div>
  );
}

export default Profile;
