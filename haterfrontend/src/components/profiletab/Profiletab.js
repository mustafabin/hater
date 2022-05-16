import "./Profiletab.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NewHate from "../newHate/newHate.js";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { store } from "../../state/store.js";

function Profile(props) {
  const user = useSelector((state) => state.user);

  // Modal constants

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  let signOut = () => {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      credentials: "include",
    };
    fetch(`http://localhost:8000/user/logout`, options)
      .then((res) => res.json())
      .then((data) => {
        store.dispatch({ type: "set", payload: { name: "Guest" } });
      });
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
          <Link to="/home" className="pronavs">
            <div className="protabLinks">Home</div>
          </Link>
          <Link to="/profile" className="pronavs">
            <div className="protabLinks">Profile</div>
          </Link>
          <Link to="/" onClick={signOut} className="pronavs">
            <div className="protabLinks">Sign Out</div>
          </Link>
          <button onClick={openModal} className="prohate">
            Hate
          </button>
          {showModal ? <NewHate setShowModal={setShowModal} /> : null}
        </div>
      ) : (
        <Link to="/" className="pronavs">
          Home
        </Link>
      )}
    </div>
  );
}

export default Profile;
