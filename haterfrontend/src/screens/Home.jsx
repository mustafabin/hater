import "../styles/Home.css";
import "../components/hates/Hates";
import { useState } from "react";
import Profilebutton from "../components/profilebutton/Profilebutton.js";
import Profiletab from "../components/profiletab/Profiletab.js";
import Hates from "../components/hates/Hates";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState({ display: "none" });
  const closeBox = () => {
    setShow({ display: "none" });
  };
  const handleClick = () => {
    setShow({ display: "flex" });
  };

  return (
    <div className="fullDiv">
      <Profilebutton click={handleClick} />
      <Profiletab
        name={user.name}
        click={closeBox}
        show={show}
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
