/* eslint-disable react/no-children-prop */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
// import { Avatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";
import { useState, useEffect } from "react";
import axios from "axios";
import backendService from "services/backend-service";

// passing an empty array makes this not dependent on props
// useEffect(() => {
//   const profiles = crud.getAll("users");
//   return this(profiles);
// }, []);

function UsersList({ title }) {
  const [profilesJSON, setProfilesJSON] = useState([]);
  const [profileRenderedElements, setProfilesRenderedElements] = useState([]);
  const [profilesDidLoad, toggleProfilesDidLoad] = useState(false);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    console.log("NAME: " + name);
    const component = (
      <Avatar
        sx={{ bgcolor: stringToColor(name) }}
        children={`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}
      />
    );
    return component;
  }

  function getName(u) {
    return u.firstname + " " + u.lastname;
  }

  function renderProfiles(users) {
    const attributes = users.map((u) => ({
      userId: u.userId,
      firstName: u.firstName,
      lastName: u.lastName,
      name: `${getName(u)}`,
      birthdate: u.birthdate,
      email: u.email,
      phoneNumber: u.phone,
      dateCreated: u.date_created,
      image: u.image,
    }));
    console.log("rendering users:" + JSON.stringify(attributes));

    const profileElements = attributes.map((u) => (
      <SuiBox
        key={u.firstname + u.lastname}
        component="li"
        display="flex"
        alignItems="center"
        py={1}
        mb={1}
      >
        Name: {u.name}
        <SuiBox mr={2}>
          <SuiAvatar
            src={u.image ? null : stringAvatar(u.name)}
            alt={`${u.firstname + u.lastname} profile image`}
            variant="rounded"
            shadow="md"
          />
        </SuiBox>
        <SuiBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <SuiTypography variant="button" fontWeight="medium">
            {u.firstname + u.lastname}
          </SuiTypography>
          <SuiTypography variant="caption" color="text">
            {u.email}
          </SuiTypography>
          <SuiTypography variant="caption" color="text">
            {u.phone}
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    ));

    return profileElements;
  }
  useEffect(() => {
    const fetchData = async () => {
      // const users = await axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
      const users = await backendService.getAll("users").then((response) => {
        console.log(`response: ${JSON.stringify(response.data)}`);
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.data;
      });
      console.log("Users API Response JSON: " + JSON.stringify(users));
      if (users) {
        // setProfilesRenderedElements(users2);
        setProfilesJSON(users);
        console.log(`JSON DATA: ${JSON.stringify(profilesJSON)}`);
        console.log(`Profiles Loaded?: ${profilesDidLoad}`);
        setProfilesRenderedElements(renderProfiles(users.data));
        console.log(`Profile Rendered Component: ${profileRenderedElements}`);
      }
    };
    fetchData();
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <SuiBox pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SuiTypography>
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {profileRenderedElements}
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
UsersList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default UsersList;
