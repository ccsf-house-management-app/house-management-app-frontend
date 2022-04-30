/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Route, Navigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import HouseHoldDashboard from "pages/home/index";
import Shop from "examples/Icons/Shop";
import AuthContext from "../context/AuthContext";

// function PrivateRoute({ children, ...rest }) {
//   const { user } = useContext(AuthContext);
//   return <Route {...rest}>{!user ? <Navigate to="/sign-in" /> : children}</Route>;
// }

function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(AuthContext);
  console.log(`In PrivateRoute, is user?: ${user}`);
  return <Route {...rest}>{!user ? <Navigate to="/login" /> : children}</Route>;
}

export default PrivateRoute;
