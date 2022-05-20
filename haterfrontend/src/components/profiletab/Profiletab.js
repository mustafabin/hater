import "./Profiletab.css";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NewHate from "../newHate/newHate.js";
import { useSelector } from "react-redux";
import { store } from "../../state/store.js";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

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
          <Link to="/" className="pronavs">
            <div className="protabLinks">Home</div>
          </Link>
          <Link to="/profile" className="pronavs">
            <div className="protabLinks">Profile</div>
          </Link>
          <a onClick={signOut} className="pronavs">
            <div className="protabLinks">Sign Out</div>
          </a>
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
