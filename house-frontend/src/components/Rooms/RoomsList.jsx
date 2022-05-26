/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

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
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard/index";
import { Box } from "@material-ui/core/index";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import Button from "@material-ui/core/Button";
import CustomAddButton from "components/CustomAddRecordButton/CustomAddRecordButton";
import CreateRoomDialog from "./CreateRoom";

// import { withStyles } from "@material-ui/core/styles";

const defaultRoomImages = [homeDecor1, homeDecor2, homeDecor3];

function RoomsList() {
  const [roomsListRenderedElements, setRoomsRenderedElements] = useState([]);
  const [openDialog, setDialogOpen] = React.useState(false);

  const setDialogToOpen = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };

  function renderRooms(roomsData) {
    const attributes = roomsData.map((room) => ({
      roomId: room.roomId,
      roomName: room.roomName,
      roomDescription: room.roomDescription,
      rent: room.rent,
      capacity: room.capacity,
      dateCreated: room.date_created,
      roomImage: room.image,
    }));
    console.log(`rendering users:${JSON.stringify(attributes)}`);
    const keyGenerator = () => `_${Math.random().toString(36).slice(2, 9)}`;

    const getRoomImage = (r) => {
      let src;
      if (!r?.roomImage) {
        src = defaultRoomImages[Math.floor(Math.random() * defaultRoomImages.length)];
      } else {
        src = r.roomImage;
      }
      return (
        <CardMedia
          component="img"
          alt="Room Image"
          image={src}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      );
    };

    const roomElements = attributes.map((r) => (
      <Grid
        container
        // item
        spacing={{ xs: 2, sm: 2, md: 2 }}
        // columns={{ xs: 1, sm: 4, md: 12 }}
        key={keyGenerator()}
        m={4}
        px={1}
      >
        <Grid item xs={12} sm={12} md={6} xl={6} ml={1}>
          <SuiBox position="relative" width="100.25%" shadow="xl" borderRadius="xl">
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "visible",
              }}
            >
              {getRoomImage(r)}
            </Card>
          </SuiBox>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          xl={4}
          container
          direction="row"
          alignItems="center"
          ml={{ sm: 2, md: 8 }}
          mt={{ sm: 2 }}
          shadow="xl"
          borderRadius="xl"
        >
          <SuiBox
            title="Room Attributes"
            key={keyGenerator()}
            component="ul"
            display="flex"
            py={1}
            mb={1}
          >
            <List dense>
              <SuiTypography
                title="Room Number"
                component="li"
                variant="h6"
                textTransform="capitalize"
                gutterBottom
              >
                {`Room #:${r.roomId}`}
              </SuiTypography>

              <Typography
                title="Room Name"
                component="li"
                variant="body2"
                textTransform="capitalize"
              >
                Room Name: {r.roomName}
              </Typography>
              <SuiTypography
                title="Room Description"
                component="li"
                variant="body2"
                textTransform="capitalize"
              >
                Room Description: {r.roomDescription}
              </SuiTypography>
              <SuiTypography
                title="Montly Rent Amount"
                component="li"
                variant="body2"
                textTransform="capitalize"
              >
                Montly Rent: {r.rent}
              </SuiTypography>
              <SuiTypography
                title="Room Capacity"
                component="li"
                variant="body2"
                textTransform="capitalize"
              >
                Room Capacity: {r.capacity}
              </SuiTypography>
            </List>
          </SuiBox>
        </Grid>
      </Grid>
    ));
    return roomElements;
  }

  // const fetchData = async () => {
  //   // const users = await axios.get("http://127.0.0.1:8000/api/users/").then((response) => {
  //   const roomsData = await backendService.getAll("rooms").then((response) => {
  //     console.log(`response: ${JSON.stringify(response.data)}`);
  //     console.log(response.data);
  //     console.log(response.status);
  //     console.log(response.statusText);
  //     console.log(response.headers);
  //     console.log(response.config);
  //     return response.data;
  //   });
  //   console.log(`Rooms API Response JSON: ${JSON.stringify(roomsData)}`);
  //   if (roomsData) {
  //     // setProfilesRenderedElements(users2);
  //     // setProfilesJSON(users);
  //     // console.log(`JSON DATA: ${JSON.stringify(profilesJSON)}`);
  //     // console.log(`Profiles Loaded?: ${profilesDidLoad}`);
  //     setRoomsRenderedElements(renderRooms(roomsData));
  //     console.log(`Profile Rendered Component: ${roomsListRenderedElements}`);
  //   } else {
  //     console.log(`Can't render rooms!`);
  //   }
  // };

  const fetchData = async () => {
    const roomsData = await backendService.getAll("rooms").then((response) => response.data);
    if (roomsData) {
      setRoomsRenderedElements(renderRooms(roomsData));
      console.log(`Profile Rendered Component: ${roomsListRenderedElements}`);
    } else {
      console.log(`Can't render rooms!`);
    }
  };

  useEffect(() => {
    closeDialog();
    fetchData();
  }, []);

  return (
    <Card
      sx={{
        mb: 2,
        ml: {
          xs: 0,
          sm: "auto",
          // md: 0,
        },
        mr: {
          xs: 0,
          sm: "auto",
          // md: 0,
        },
        height: "100%",
        width: {
          sm: "90%", // theme.breakpoints.up('sm')
          md: "90%", // theme.breakpoints.up('md')
          lg: "75%", // theme.breakpoints.up('lg')
          xl: "50rem", // theme.breakpoints.up('xl')
        },
      }}
    >
      <SuiBox pt={2} px={2} mt={1} mb={1}>
        <SuiTypography gutterBottom variant="h4" fontWeight="medium" textTransform="capitalize">
          Rooms
        </SuiTypography>
      </SuiBox>
      {roomsListRenderedElements}

      {/* <SuiButton> */}

      <CreateRoomDialog open={openDialog || false} onClose={closeDialog} fetchData={fetchData} />
      {/* </SuiButton> */}
    </Card>
  );
}

export default RoomsList;
