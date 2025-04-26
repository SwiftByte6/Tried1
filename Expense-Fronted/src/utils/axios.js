import axios from "axios";

const instance = axios.create({
  baseURL: "https://tried1.onrender.com/api/v1", // Use your live backend URL
});

export default instance;

