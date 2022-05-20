import React from "react";
import "../styles/ProfilePage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MiniHates from "../components/miniHates/miniHates.js";
import { getAllHates } from "../services/hates.js";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MessageIcon from "@mui/icons-material/Message";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useSelector } from "react-redux";

export default function ProfilePage(props) {
  const user = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(true);
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [slideIn, setSlideIn] = useState({ display: "flex" });

  let fetchUserPosts = () => {
    fetch(`https://haterbackend.herokuapp.com/allHates?haterid=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data["message"]) {
          setUserPosts(data);
        }
      });
  };
  let fetchHates = () => {
    fetch(`https://haterbackend.herokuapp.com/allHates`)
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
      });
  };
  useEffect(() => {
    fetchHates();
    fetchUserPosts();
  }, []);
  useEffect(() => {
    fetchUserPosts();
  }, [user.id]);
  function setDisplay() {
    if (toggle == true) {
      // setShow("");
      setSlideIn({ transform: "translate(0%, 0%)" });
    } else {
      setSlideIn({ transform: "translate(0%, 1000px)" });
    }
    setToggle((prevCheck) => !prevCheck);
  }

  return (
    <div className="proPageContainer">
      <div className="contentContainer">
        <div className="frame"></div>
        <div className="proPageLinks">
          <div className="proLogo"></div>
          <Link to="/home" className="proHome"></Link>
          <div className="proSearchButton" onClick={setDisplay}></div>
          <Link to="/" className="proRoot"></Link>
        </div>
        <div className="proPageContent">
          <div className="proBody">
            <div className="proBodyFrame"></div>
            <div className="mainProProfilePic">
              <img
                alt={`${user.name} profile`}
                src={`https://avatars.dicebear.com/api/adventurer/${user.name}.svg?flip=1`}
              ></img>
            </div>
            <div className="mainProTweetCount">
              <div className="mainProfileName">@{user.tag}</div>
              <MessageIcon className="hate-crit"></MessageIcon>
              <AutorenewIcon className="hate-renew"></AutorenewIcon>
              <HeartBrokenIcon className="hate-broken"></HeartBrokenIcon>
            </div>
            <div className="ProfileHateContainer">
              {userPosts.map((hate) => (
                <MiniHates
                  hate_tag={hate.hate_tag}
                  hater_name={hate.hater_name}
                  hate={hate.hate}
                  hate_count={hate.hate_count}
                  rehate_count={hate.rehate_count}
                  crit_count={hate.crit_count}
                />
              ))}
            </div>
          </div>
          <div className="proSearch" style={slideIn}>
            <form className="landingForm">
              <input
                className="landingLoginInput"
                placeholder="Search Tag"
                type="text"
                name="name"
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
              />
            </form>
            {datas.map(
              (dater) =>
                dater.hate_tag.toUpperCase().includes(search.toUpperCase()) && (
                  <MiniHates
                    hate_tag={dater.hate_tag}
                    hater_name={dater.hater_name}
                    hate={dater.hate}
                    hate_count={dater.hate_count}
                    rehate_count={dater.rehate_count}
                    crit_count={dater.crit_count}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
