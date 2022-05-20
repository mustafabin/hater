import React from "react";
import { useState } from "react";
import "./Profilebutton.css";
import MENU from "../profilebutton/icons8-menu-50.png";
import GIF from "../profilebutton/menu.gif";

function Probutton(props) {
  const [slideIn, setSlideIn] = useState({ display: "flex" });
  const [menu, setMenu] = useState(MENU);
  const [toggle, setToggle] = useState(true);

  function setMenuDisplay() {
    console.log("changed");
    if (toggle == true) {
      props.setSlideIn({ transform: "translate(0%, 0%)" });
      setMenu(GIF);
    } else {
      props.setSlideIn({ transform: "translate(-1000px, 0%)" });
      setMenu(MENU);
    }
    setToggle((prevCheck) => !prevCheck);
  }

  return (
    <div className="proButtonBack">
      <img className="probutton" onClick={setMenuDisplay} src={menu}></img>
    </div>
  );
}

export default Probutton;
