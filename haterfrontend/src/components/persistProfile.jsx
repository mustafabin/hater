import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { store } from "../state/store";

export default function CSRFToken() {
  useEffect(() => {
    let headerInfo = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    };
    let options = {
      method: "GET",
      headers: headerInfo,
      credentials: "include",
    };
    fetch(`http://localhost:8000/user/grabProfile`, options)
      .then((res) => res.json())
      .then((data) => {
        store.dispatch({ type: "set", payload: data.profile });
      })
      .catch((err) => console.log(err));
  }, []);

  return <></>;
}
