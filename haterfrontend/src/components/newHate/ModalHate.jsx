import React from "react";
import { useState } from "react";
import "../hates/Hates.css";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function ModalHate({ setShowModal }) {
  const user = useSelector((state) => state.user);

  const [hate, setHate] = useState({
    h_body: "",
    haters: 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHate({
      ...hate,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let postOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      credentials: "include",
      body: JSON.stringify({
        h_body: hate.h_body,
        haters: user.id,
      }),
    };
    fetch(`https://haterbackend.herokuapp.com/createHate`, postOptions).then(
      () => {
        setShowModal(false);
        window.location.reload();
      }
    );
  };

  return (
    <div className="hate-modal-text-box">
      <div className="hate-profile-textbox">
        <span className="hate-forms-home">Home</span>
        <div className="hate-profile-pic">
          <img
            src={`https://avatars.dicebear.com/api/adventurer/${user.name}.svg?flip=1`}
            alt="profile"
          ></img>
        </div>
      </div>
      <div className="hates-form">
        <form className="hates-form-box" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="hates-form-text"
            id="hateFormText"
            placeholder="Who Hatin'"
            name="h_body"
            value={hate.h_body}
            maxLength="140"
            type="text"
          />
          <input className="hates-modal-button-up" type="submit" value="Hate" />
        </form>
      </div>
    </div>
  );
}
