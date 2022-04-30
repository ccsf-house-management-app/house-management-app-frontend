/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SuiBox from "components/SuiBox/index";

// "userid": 1,
// "firstname": "Samantha",
// "lastname": "Mosuela",
// "birthdate": "2006-02-19",
// "email": "sam@me.com",
// "phone": "4159945876",
// "date_created": "2022-03-27"

function Users(props) {
  const [users, setUsers] = useState([]);

  users.map((user) => (
    <SuiBox className="user-item">
      <h2>{`${user.firstname} ${user.lastname}`}</h2>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{`Birth Date: ${user.birthdate}`}</p>
      <p>{`Date Added: ${user.date_created}`}</p>
    </SuiBox>
  ));
}

Users.propTypes = {};

export default Users;
