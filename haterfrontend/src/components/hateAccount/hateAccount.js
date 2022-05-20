import React from "react";
import { Link } from "react-router-dom";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MessageIcon from "@mui/icons-material/Message";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import "../miniHates/miniHates.css";

export default function HateAccount(props) {
  return (
    <div className="MinBox">
      <div className="HateAccountContainer">
        <Link to={`/profile/${props.hate_tag}`}>
          <div className="hateAccountPic">
            <img
              src={`https://avatars.dicebear.com/api/adventurer/${props.hate_username}.svg?flip=1`}
            ></img>
          </div>
        </Link>
        <div className="hateAccountID">
          {
            <Link className="nameLinks" to={`/profile/${props.hate_tag}`}>
              {props.hate_username}
            </Link>
          }
          {
            <Link className="atLinks" to={`/profile/${props.hate_tag}`}>
              @{props.hate_tag}
            </Link>
          }
        </div>
      </div>
    </div>
  );
}
