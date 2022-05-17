/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import backendService from "services/backend-service";

const fetchRoomData = () =>
  // const users = await axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
  //   const roomsData =
  new Promise((resolve, reject) => {
    backendService
      .getAll("rooms")
      .then((response) => {
        console.log(`response: ${JSON.stringify(response.data)}`);
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.data;
      })
      .catch((error) => reject(error));
  });
//   console.log(`roomsData: ${JSON.stringify(roomsData)}`);
//   return roomsData;
// fetchData();

export { fetchRoomData };
