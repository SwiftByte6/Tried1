import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Use your live backend URL
});

export default instance;

