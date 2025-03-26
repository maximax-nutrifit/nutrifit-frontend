import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Update this with your actual backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
