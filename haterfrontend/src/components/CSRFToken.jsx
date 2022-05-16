import React, { useState, useEffect } from "react";

export default function CSRFToken() {
  const [csrftoken, setcsrftoken] = useState("");

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    fetch(`http://localhost:8000/user/csrf_cookie`, {
      credentials: "include",
    })
      .then((res) => {
        setcsrftoken(getCookie("csrftoken"));
        console.log(getCookie("csrftoken"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken || ""} />
  );
}
