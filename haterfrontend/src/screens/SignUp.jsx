import React from "react";
import "../styles/SignUp.css";
import { useState } from "react";
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
    if (form.password === form.re_password) {
      let registerOption = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      };
      fetch(`https://haterbackend.herokuapp.com/user/register`, registerOption)
        .then((res) => res.json())
        .then((data) => {
          if (!data["error"]) {
            localStorage.setItem("knox", data["token"]);
            fetch(`https://haterbackend.herokuapp.com/user/grabProfile`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${data["token"]}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                store.dispatch({ type: "set", payload: data.profile });
                navigate("/home");
              })
              .catch((err) => console.log(err));
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
