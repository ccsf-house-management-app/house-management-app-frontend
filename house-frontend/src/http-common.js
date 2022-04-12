/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";

axios.defaults.withCredentials = false;

const headers = {
  "Content-Type": "application/json",
  // eslint-disable-next-line prettier/prettier
  "Accept" : "application/json",
  // "Access-Control-Allow-Origin": "",
  // "Access-Control-Allow-Methods": "GET,POST",
};

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});
