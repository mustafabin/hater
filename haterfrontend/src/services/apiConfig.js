import axios from "axios";

let apiUrl = "https://haterbackend.herokuapp.com";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
