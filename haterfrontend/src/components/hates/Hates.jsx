import React from "react";
import HatesFeed from "./HatesFeed";
import HatesForm from "./HatesForm";
import { useState, useEffect } from "react";
import { getHates } from "../../services/hates";
import "./Hates.css";
import Button from "@mui/material/Button";

export default function Hates() {
  const [hates, setHates] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState([0, 10]);
  const [showEndButton, setShowEndButton] = useState(false);
  let nextPage = () => {
    if (hates.length > currentPage[1]) {
      setCurrentPage((prev) => [prev[1], prev[1] + 10]);
    }
  };
  useEffect(() => {
    const fetchHates = async () => {
      const response = await getHates();
      setHates(response);
    };
    fetchHates();
  }, [toggle]);

  //to track what page we are on
  useEffect(() => {
    hates.length < currentPage[1]
      ? setShowEndButton(true)
      : setShowEndButton(false);
  }, [hates, currentPage]);
  return (
    <div className="hates-box">
      <div className="hates-form-container">
        <HatesForm toggle={toggle} setToggle={setToggle} />
      </div>
      <div className="hates-feed">
        <HatesFeed hates={hates} setToggle={setToggle} pageNum={currentPage} />
      </div>
      <div className="hates-feed-pages-div">
        {!showEndButton ? (
          <Button color="error" variant="outlined" onClick={nextPage}>
            Next Page
          </Button>
        ) : (
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              setCurrentPage([0, 10]);
              setShowEndButton(false);
            }}
          >
            Back To Front Page
          </Button>
        )}
      </div>
    </div>
  );
}
