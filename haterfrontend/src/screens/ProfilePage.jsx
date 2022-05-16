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

  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  let fetchUserPosts = () => {
    fetch(`http://localhost:8000/allHates?haterid=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data);
      });
  };
  const fetchHates = async () => {
    const response = await getAllHates();
    setDatas(response);
  };

  useEffect(() => {
    fetchHates();
    fetchUserPosts();
  }, []);
  return (
    <div className="proPageContainer">
      <div className="contentContainer">
        <div className="frame"></div>
        <div className="proPageContent">
          <div className="proPageLinks">
            <div className="proLogo"></div>
            <Link to="/home" className="proHome"></Link>
            <div className="proSearchButton"></div>
            <Link to="/" className="proRoot"></Link>
          </div>
          <div className="proBody">
            <div className="proBodyFrame"></div>
            <div className="proProfilePic">
              <img
                alt={`${user.name} profile`}
                src={`https://avatars.dicebear.com/api/adventurer/${user.name}.svg?flip=1`}
              ></img>
            </div>
            <div className="proTweetCount">
              <MessageIcon className="hate-crit"></MessageIcon>
              <AutorenewIcon className="hate-renew"></AutorenewIcon>
              <HeartBrokenIcon className="hate-broken"></HeartBrokenIcon>
            </div>
            <div className="ProfileHateContainer">
              {userPosts.map((hate) => (
                <MiniHates
                  hater_name={hate.hater_name}
                  hater_tag={hate.hate_tag}
                  hate={hate.hate}
                  hate_count={hate.hate_count}
                  rehate_count={hate.rehate_count}
                  crit_count={hate.crit_count}
                />
              ))}
            </div>
          </div>
          <div className="proSearch">
            <form className="landingForm">
              <input
                className="landingLoginInput"
                placeholder="tag"
                type="text"
                name="name"
                onChange={(e) => {
                  e.preventDefault();
                  setSearch(e.target.value);
                }}
              />
            </form>
            {datas.map(
              (data) =>
                data.hate_tag.toUpperCase().includes(search.toUpperCase()) && (
                  <MiniHates
                    profileID={data.hater_id}
                    hater_name={data.hater_name}
                    hater_tag={data.hate_tag}
                    hate={data.hate}
                    hate_count={data.hate_count}
                    rehate_count={data.rehate_count}
                    crit_count={data.crit_count}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
