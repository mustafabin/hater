import axios from "axios";

let apiUrl = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
