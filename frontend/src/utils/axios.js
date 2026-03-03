import axios from "axios";

const api = axios.create({
  baseURL: "https://foodhunt-website.onrender.com/api",
});

api.interceptors.request.use((config) => {
 const token = localStorage.getItem("token");

if (!token) {
  console.log("User not logged in");
  return;
}
});

export default api;
