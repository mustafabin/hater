import React from "react";
import "../styles/SignUp.css";
import { useState } from "react";
import Cookies from "js-cookie";
import CSRFToken from "../components/CSRFToken";
import { useNavigate } from "react-router-dom";
import { store } from "../state/store";

export default function SignUp() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    tag: "",
    password: "",
    re_password: "",
  });
  let handleSubmit = (e) => {
    e.preventDefault();
    let token = Cookies.get("csrftoken");
    console.log(token);
    if (form.password === form.re_password) {
      let headerInfo = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      };
      let registerOption = {
        method: "POST",
        headers: headerInfo,
        credentials: "include",
        body: JSON.stringify(form),
      };
      let loginOption = {
        method: "POST",
        headers: headerInfo,
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      };
      let options = {
        method: "GET",
        headers: headerInfo,
        credentials: "include",
      };

      fetch(`http://localhost:8000/user/register`, registerOption)
        .then((res) => res.json())
        .then((data) => {
          if (!data["error"]) {
            fetch(`http://localhost:8000/user/login`, loginOption)
              .then((res) => res.json())
              .then(() => {
                fetch(`http://localhost:8000/user/grabProfile`, options)
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data.profile);
                    store.dispatch({ type: "set", payload: data.profile });
                  })
                  .catch((err) => console.log(err));
              })
              .then(() => navigate("/home"));
          } else {
            alert(data["error"]);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("passwords dont match");
    }
  };
  let updateFormData = (e) => {
    let { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <CSRFToken></CSRFToken>
        <h1>Sign Up</h1>

        <label>
          <h3>Username</h3>
        </label>
        <input
          onChange={updateFormData}
          className="signup-inputs"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
        <label>
          <h3>Tag</h3>
        </label>
        <input
          onChange={updateFormData}
          className="signup-inputs"
          type="text"
          placeholder="Enter Tag"
          name="tag"
          required
        />
        <label>
          <h3>Password</h3>
        </label>
        <input
          onChange={updateFormData}
          className="signup-inputs"
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <label>
          <h3>Confirm Password</h3>
        </label>
        <input
          onChange={updateFormData}
          className="signup-inputs"
          type="password"
          placeholder="Confirm Password"
          name="re_password"
          required
        />
        <div className="singup-button-container">
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
