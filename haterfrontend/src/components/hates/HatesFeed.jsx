import React, { useState, useEffect } from "react";
import Hate from "./Hate";

export default function HatesFeed({ hates, setToggle, pageNum }) {
  const [hatesPaged, setHatesPaged] = useState([]);
  useEffect(() => {
    setHatesPaged(hates.slice(pageNum[0], pageNum[1]));
  }, [hates, pageNum]);

  return (
    <div className="hates-list">
      {hatesPaged.map((hate, id) => (
        <Hate setToggle={setToggle} key={id} hateData={hate} />
      ))}
    </div>
  );
}
