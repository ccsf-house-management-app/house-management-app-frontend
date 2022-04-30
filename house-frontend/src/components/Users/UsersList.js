/* eslint-disable no-shadow */
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

// import Date from "date";

// react-routers components
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
import { useState, useEffect } from "react";
import axios from "axios";
import backendService from "services/backend-service";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PlaceholderCard from "examples/Cards/PlaceholderCard/index";

// passing an empty array makes this not dependent on props
// useEffect(() => {
//   const profiles = crud.getAll("users");
//   return this(profiles);
// }, []);
export const styles2 = (theme) => ({
  marginAutoContainer: {
    width: 500,
    height: 80,
    display: "flex",
    backgroundColor: "gold",
  },
  marginAutoItem: {
    margin: "auto",
  },
  alignItemsAndJustifyContent: {
    width: "75%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: theme.spacing(4),
    marginBottom: "4rem",
    backgroundColor: "pink",
  },
});

function UsersList({ title }) {
  const [profileRenderedElements, setProfilesRenderedElements] = useState([]);

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
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  function getName(u) {
    return u.firstname + " " + u.lastname;
  }

  function renderProfiles(users) {
    const attributes = users.map((u) => ({
      userId: u.userid,
      firstName: u.firstName,
      lastName: u.lastName,
      name: `${getName(u)}`,
      birthdate: u.birthdate,
      email: u.email,
      phone: u.phone,
      dateCreated: u.date_created,
      image: u.image,
    }));
    console.log("rendering users:" + JSON.stringify(attributes));
    const keyGenerator = () => "_" + Math.random().toString(36).slice(2, 9);

    const profileElements = attributes.map((u) => (
      <Grid
        container
        // item
        spacing={{ xs: 2, sm: 2, md: 3 }}
        // columns={{ xs: 1, sm: 4, md: 12 }}
        key={keyGenerator()}
      >
        <Grid item xs={2} sm={2} md={2} xl={2}>
          <SuiBox key={keyGenerator()} alignItems="end">
            <Avatar
              {...stringAvatar(u.name)}
              // src={u.image ? null : stringAvatar(u.name, keyGenerator())}
              alt={`${u.firstname + " " + u.lastname} profile image`}
              // variant="rounded"
              shadow="md"
            />
          </SuiBox>
        </Grid>

        <Grid item marginBottom={{ xs: -2, sm: 1 }} xs={10} sm={5} md={6} xl={6}>
          <SuiBox
            key={u.firstname + u.lastname + u.id + Math.random().toString(36).slice(2, 9)}
            component="li"
            display="flex"
            alignItems="flex-start"
            // justifyContent="center"
            // py={1}
            // px={2}
            mt={{ xs: 0, sm: 0 }}
            // mb={1}
            // ml={1}
          >
            {u.name}
          </SuiBox>
        </Grid>
        <Grid item xs={10} sm={4} md={4} xl={4} marginBottom={2}>
          <SuiBox
            display="flex"
            // component="li"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            ml={{ xs: "20.5%", sm: "25%" }}
            // position={{ xs: "relative" }}
            // paddingLeft={{ xs: "5rem" }}
          >
            <SuiTypography variant="button" fontWeight="medium">
              {/* {u.name} */}
              user # {u.userId}
            </SuiTypography>
            <SuiTypography variant="caption" color="text">
              {u.email}
            </SuiTypography>
            <SuiTypography variant="caption" color="text">
              {u.phone}
            </SuiTypography>
          </SuiBox>
        </Grid>
      </Grid>
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
        // setProfilesJSON(users);
        // console.log(`JSON DATA: ${JSON.stringify(profilesJSON)}`);
        // console.log(`Profiles Loaded?: ${profilesDidLoad}`);
        setProfilesRenderedElements(renderProfiles(users));
        console.log(`Profile Rendered Component: ${profileRenderedElements}`);
      }
    };
    fetchData();
  }, []);

  const cardStyles = Card.styles;

  return (
    <Card
      // style={{ marginBottom: "2rem", marginLeft: "2rem", marginRight: "2rem", marginTop: "2rem" }}
      // className="alignItemsAndJustifyContent"
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
          // xs: "75%", // theme.breakpoints.up('xs')
          sm: "90%", // theme.breakpoints.up('sm')
          md: "90%", // theme.breakpoints.up('md')
          lg: "75%", // theme.breakpoints.up('lg')
          xl: "50rem", // theme.breakpoints.up('xl')
        },
        // width: "75%",
        // "@media (min-width:900)": {
        //   // eslint-disable-line no-useless-computed-key
        //   width: "50%",
        // },
        // width: "65%",
        // "@media (min-width:640)": {
        //   // eslint-disable-line no-useless-computed-key
        //   width: "75%",
        // },
      }}
      // width={{ xs: "3/4", sm: "5/8", md: "1/2" }}
    >
      <SuiBox>
        <SuiBox pt={2} px={2}>
          <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize">
            {title}
          </SuiTypography>
        </SuiBox>
        <SuiBox p={2}>
          {profileRenderedElements}
          {/* <SuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          </SuiBox> */}
        </SuiBox>
      </SuiBox>
      <SuiBox p="2">
        {/* <PlaceholderCard title="Create User">Create new User</PlaceholderCard> */}
        <PlaceholderCard title={{ variant: "h5", text: "Create new User" }} outlined />
      </SuiBox>
    </Card>
  );
}

// Typechecking props for the ProfilesList
UsersList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default UsersList;
