import React, { useState, useEffect } from "react";
import Hate from "./Hate";
import gifSrc from "../../images/loading.gif";

export default function HatesFeed({ hates, setToggle, pageNum }) {
  const [hatesPaged, setHatesPaged] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setHatesPaged(hates.slice(pageNum[0], pageNum[1]));
  }, [hates, pageNum]);
  useEffect(() => {
    setLoaded(true);
  }, [hatesPaged]);
  let loadingGif = (
    <img src={gifSrc} alt="Loading screen" className="loading-gif" />
  );
  return (
    <div className="hates-list">
      {!loaded
        ? loadingGif
        : hatesPaged.map((hate, id) => (
            <Hate setToggle={setToggle} key={id} hateData={hate} />
          ))}
    </div>
  );
}
