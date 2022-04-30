/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// prop-types is library for typechecking of props

import PropTypes from "prop-types";
// react-routers components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import { Avatar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import theme from "assets/theme";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiAvatar from "components/SuiAvatar";
import SuiButton from "components/SuiButton";

import axios from "axios";
import backendService from "services/backend-service";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PlaceholderCard from "examples/Cards/PlaceholderCard/index";
import UsersList from "components/Users/UsersList";
import RoomsList from "components/Rooms/RoomsList";

const recordType = {
  rooms: <RoomsList />,
  residents: <UsersList title="Tenants" />,
};

function Records() {
  const [profilesJSON, setProfilesJSON] = useState([]);
  const [loadRecords, setProfilesRenderedElements] = useState([]);
  const [profilesDidLoad, toggleProfilesDidLoad] = useState(false);

  return (
    <Card>
      <Card m={2}>
        <SuiBox m={2} pt={2} px={2}>
          <SuiTypography
            gutterBottom
            align="center"
            variant="h2"
            fontWeight="medium"
            textTransform="capitalize"
          >
            Records
          </SuiTypography>
        </SuiBox>
      </Card>
      {/* {recordType.forEach((recordComponent) => {
        recordComponent();
      })} */}
      {/* <SuiBox p="2">
        <PlaceholderCard title="Create User">Create new User</PlaceholderCard>
        <PlaceholderCard title={{ variant: "h5", text: "Create new User" }} outlined />
      </SuiBox> */}
      <SuiBox m={2}>{recordType.rooms}</SuiBox>
      <SuiBox m={2}>{recordType.residents}</SuiBox>
    </Card>
  );
}

Records.propTypes = {};

export default Records;
