/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

function UserInfo() {
  const { user } = useContext(AuthContext);
  //   const [userLoggedIn, setUserLoggedIn] = useState([]);

  //   useEffect(() => {
  //     setUserLoggedIn(user);
  //   }, [user]);

  if (user) {
    return (
      <div>
        <h1>Hello, {user.username}</h1>
      </div>
    );
  }
  <div>
    <h1>User Not Logged In</h1>
  </div>;
}

export default UserInfo;
