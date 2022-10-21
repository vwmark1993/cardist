import axios from "axios";
export default axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://cardist-backend.azurewebsites.net/api" : "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});