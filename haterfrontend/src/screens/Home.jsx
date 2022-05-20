import "../styles/Home.css";
import "../components/hates/Hates";
import { useState } from "react";
import Profilebutton from "../components/profilebutton/Profilebutton.js";
import Profiletab from "../components/profiletab/Profiletab.js";
import Hates from "../components/hates/Hates";
import { useSelector } from "react-redux";
import MENU from "../components/profilebutton/icons8-menu-50.png";
import GIF from "../components/profilebutton/menu.gif";

function Home() {
  const user = useSelector((state) => state.user);
  const [slideIn, setSlideIn] = useState({ transform: "translate(-1000px, 0%)" });


 
  return (
    <div className="fullDiv">
      <Profilebutton setSlideIn={setSlideIn}/>
      <Profiletab
        setShow={slideIn}
        name={user.name}
        picture={`https://avatars.dicebear.com/api/adventurer/${user.name}.svg?flip=1`}
        homeRoute="/"
      />
      <div className="mid">
        <Hates />
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Home;
