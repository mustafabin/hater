import React, { useState, useEffect } from "react";
import "./comments.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Profilebutton from "../../components/profilebutton/Profilebutton.js";
import Profiletab from "../../components/profiletab/Profiletab.js";
import HatePost from "./HatePost.jsx";
import PostComment from "./PostComment.jsx";
import MiniComments from "./MiniComments.jsx";

export default function CommentSection() {
  let { hateid } = useParams();
  const user = useSelector((state) => state.user);
  const [hatepost, setHatepost] = useState({});
  const [comments, setComments] = useState(null);
  const [togglestate, setTogglestate] = useState(true);
  const [show, setShow] = useState({ display: "flex" });
  const closeBox = () => {
    setShow({ display: "none" });
  };
  const handleClick = () => {
    setShow({ display: "flex" });
  };
  let fetchComments = () => {
    fetch(`http://localhost:8000/getHate?hateid=${hateid}`)
      .then((res) => res.json())
      .then((data) => setHatepost(data))
      .then(() => {
        fetch(`http://localhost:8000/comments?hateid=${hateid}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.length) setComments(data);
          });
      });
  };
  useEffect(() => {
    fetchComments();
  }, [togglestate]);
  return (
    <div className="comment-main-container">
      <Profilebutton click={handleClick} />
      <Profiletab
        name={user.name}
        click={closeBox}
        show={show}
        picture={`https://avatars.dicebear.com/api/adventurer/${user.name}.svg?flip=1`}
      />
      <div className="comment-section-main-container">
        <HatePost hate={hatepost}></HatePost>
        <div className="comment-feed">
          {!comments ? (
            <h3 className="comment-no-one">No one is here ¯\_( ツ )_/¯</h3>
          ) : (
            comments.map((comment, i) => (
              <MiniComments key={i} hater={comment}></MiniComments>
            ))
          )}
        </div>
        <PostComment
          setTogglestate={setTogglestate}
          post_id={hateid}
        ></PostComment>
      </div>
    </div>
  );
}
