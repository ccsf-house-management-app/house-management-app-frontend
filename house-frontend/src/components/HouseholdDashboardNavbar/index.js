/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/self-closing-comp */
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

import { useState, useEffect, useContext, useCallback } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import pxToRem from "assets/theme/functions/pxToRem";
import AuthContext from "context/AuthContext";
import UserInfo from "components/UserInfo";

function HouseholdDashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const { user } = useContext(AuthContext);
  // const authContext = useContext(AuthContext);
  const [userLoggedIn, setUserLoggedIn] = useState([]);

  const checkUser = useCallback(() => {
    if (user) {
      setUserLoggedIn(user);
      console.log(`Dashboard Navbar, is user logged in?: ${userLoggedIn}`);
    } else {
      console.log(`Dashboard Navbar, is user logged in?: ${userLoggedIn}`);
    }
  }, [user]);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  // checkUser();

  return (
    <>
      <div style={{ minWidth: 576 }}></div>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      >
        <Grid
          container
          width={{ xs: "75%", sm: "100%" }}
          mb={{ xs: 2 }}
          spacing={{ xs: 2, sm: 2, md: 2 }}
          align="center"
          justify="center"
        >
          <Grid item xs={6}>
            <Toolbar sx={(theme) => navbarContainer(theme)}>
              <SuiBox
                color="inherit"
                width="100%"
                mb={{ xs: 1, md: 1 }}
                sx={(theme) => navbarRow(theme, { isMini })}
              >
                <Breadcrumbs
                  id="breadcrumbs"
                  icon="home"
                  title={route[route.length - 1]}
                  route={route}
                  light={light}
                />
              </SuiBox>
            </Toolbar>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            {isMini ? null : (
              <SuiBox>
                {/* <SuiBox pr={4}>
            <SuiInput
              placeholder="Type here..."
              icon={{ component: "search", direction: "left" }}
            />
          </SuiBox> */}
                <SuiBox color={light ? "white" : "inherit"}>
                  {userLoggedIn ? (
                    <UserInfo />
                  ) : (
                    <Link to="/authentication/sign-in">
                      <IconButton sx={navbarIconButton} size="small">
                        <Icon
                          sx={({ palette: { dark, white } }) => ({
                            color: light ? white.main : dark.main,
                          })}
                        >
                          account_circle
                        </Icon>
                        <SuiTypography
                          variant="button"
                          fontWeight="medium"
                          color={light ? "white" : "dark"}
                        >
                          Sign in
                        </SuiTypography>
                      </IconButton>
                    </Link>
                  )}
                  <IconButton
                    size="small"
                    color="inherit"
                    sx={navbarMobileMenu}
                    onClick={handleMiniSidenav}
                  >
                    {/* <Icon className={light ? "text-white" : "text-dark"}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon> */}
                  </IconButton>
                  {/* <IconButton
            size="small"
            color="inherit"
            sx={navbarIconButton}
            onClick={handleConfiguratorOpen}
          >
            <Icon>settings</Icon>
          </IconButton> */}
                  {/* <IconButton
            size="small"
            color="inherit"
            sx={navbarIconButton}
            aria-controls="notification-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={handleOpenMenu}
          >
            <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
          </IconButton> */}
                  {renderMenu()}
                </SuiBox>
              </SuiBox>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          width={{ xs: "75%", sm: "100%" }}
          mb={{ xs: 2 }}
          spacing={{ xs: 2, sm: 2, md: 2 }}
          align="center"
          justify="center"
        >
          <Grid item xs={4}>
            <SuiBox color={light ? "white" : "inherit"}>
              {/* // display={{ xs: "inline-flex", sm: "flex" }}> */}
              <Link to="/records/" onClick={checkUser}>
                <SuiTypography
                  // variant="button"
                  // fontSize="600"
                  variant="button"
                  fontWeight="bold"
                  // fontSize={{ pxToRem(16) }}
                  color={light ? "white" : "dark"}
                  fontSize={pxToRem(18)}
                >
                  Records
                </SuiTypography>
              </Link>
            </SuiBox>
          </Grid>
          <Grid item xs={4}>
            <SuiBox color={light ? "white" : "inherit"}>
              <Link to="/reports/">
                <SuiTypography
                  variant="button"
                  fontWeight="bold"
                  color={light ? "white" : "dark"}
                  fontSize={pxToRem(18)}
                >
                  Reports
                </SuiTypography>
              </Link>
            </SuiBox>
          </Grid>
          <Grid item xs={4}>
            <SuiBox color={light ? "white" : "inherit"}>
              <Link to="/resources/">
                <SuiTypography
                  variant="button"
                  fontWeight="bold"
                  color={light ? "white" : "dark"}
                  fontSize={pxToRem(18)}
                >
                  Resources
                </SuiTypography>
              </Link>
            </SuiBox>
          </Grid>
        </Grid>
        {/* <Toolbar sx={(theme) => navbarContainer(theme)}></Toolbar> */}
        {/* <Toolbar sx={(theme) => navbarContainer(theme)}>
      <SuiBox color={light ? "white" : "inherit"}>
        <Link to="/authentication/sign-in">
          <IconButton sx={navbarIconButton} size="small">
            <Icon
              sx={({ palette: { dark, white } }) => ({
                color: light ? white.main : dark.main,
              })}
            >
              account_circle
            </Icon>
            <SuiTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
              Sign in
            </SuiTypography>
          </IconButton>
        </Link>
      </SuiBox>
    </Toolbar> */}
      </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
HouseholdDashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
HouseholdDashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default HouseholdDashboardNavbar;
