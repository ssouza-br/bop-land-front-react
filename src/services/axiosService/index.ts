import axios from "axios";

// Set up Axios to include credentials
axios.defaults.withCredentials = true;

export const requestInstance = axios.create({
  baseURL: "http://localhost:5666",
});
