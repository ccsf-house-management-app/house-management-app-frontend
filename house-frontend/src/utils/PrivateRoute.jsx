/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Route, Navigate, useLocation } from "react-router-dom";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

// function PrivateRoute({ children, ...rest }) {
//   const { user } = useContext(AuthContext);
//   return <Route {...rest}>{!user ? <Navigate to="/sign-in" /> : children}</Route>;
// }

// // eslint-disable-next-line react/function-component-definition
// const PrivateRoute = ({ children, ...rest }) => {
//   // const { user } = useContext(AuthContext);
//   // console.log(`In PrivateRoute, is user?: ${user}`);
//   console.log("Private Route works");
//   return <Route {...rest}> {children} </Route>;
//   // return (
//   //   // <Route exact {...rest}>
//   //   !user ? <Navigate to="/login" /> : <Route {...rest}>{children}</Route>
//   // );
// };
// import React from 'react';
// import { Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="authentication/sign-in" state={{ from: location }} />;
}

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);
  // const auth = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

// export RequireAuth;

export default PrivateRoute;
