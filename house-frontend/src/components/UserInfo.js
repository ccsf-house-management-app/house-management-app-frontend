/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { useContext, useEffect, useState } from "react";
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import pxToRem from "assets/theme/functions/pxToRem";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { Link } from "react-router-dom";

import * as React from "react";
import Button from "@mui/material/Button";
// import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import AuthContext from "../context/AuthContext";

export function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}

function UserInfo() {
  const { user } = useContext(AuthContext);
  //   const [userLoggedIn, setUserLoggedIn] = useState([]);

  //   useEffect(() => {
  //     setUserLoggedIn(user);
  //   }, [user]);

  if (user) {
    return (
      <div>
        <Link to="/authentication/sign-in">
          <IconButton sx={navbarIconButton} size="small">
            <Icon>account_circle</Icon>
            <SuiTypography
              variant="button"
              fontSize={pxToRem(18)}
              textTransform="capitalize"
              fontWeight="medium"
            >
              {user.username}
            </SuiTypography>
          </IconButton>
        </Link>
        {/* <SuiTypography variant="h6" textTransform="capitalize" gutterBottom>
          {user.username}
        </SuiTypography> */}
      </div>
    );
  }
  // <div>
  //   <h1>User Not Logged In</h1>
  // </div>;
}

export default UserInfo;
