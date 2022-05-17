/* eslint-disable no-console */
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

import { useState, useEffect, useContext, useCallback } from "react";

// react-router components
// @ts-ignore
import { Routes, Route, useLocation } from "react-router-dom";

// @mui material components
// @ts-ignore
import { ThemeProvider } from "@mui/material/styles";
// @ts-ignore
import CssBaseline from "@mui/material/CssBaseline";
// @ts-ignore
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
// @ts-ignore
import SuiBox from "components/SuiBox";

import HouseholdDashboardLayout from "layouts/LayoutContainers/HouseholdDashboardLayout/index";
// @ts-ignore
import HouseholdDashboardNavbar from "components/HouseholdDashboardNavbar/index";

// Soft UI Dashboard React examples
// import Sidenav from "examples/Sidenav";

// Soft UI Dashboard React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
// eslint-disable-next-line import/named
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setOpenConfigurator } from "context";
import loginRoutes from "utils/loginRoute";
import HouseHoldDashboard from "pages/Home/index";
import Records from "./pages/records/Records";
import AuthContext from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

// import ProtectedPage from "./components/ProtectedPage";
// import PrivateRoute from "./utils/PrivateRoute";
// import getRoutes from "./utils/getRoutes";
// import { useContext, useState, useEffect } from "react";
// eslint-disable-next-line import/no-named-as-default
// import AuthContext from "context/AuthContext";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const { user } = useContext(AuthContext);

  // eslint-disable-next-line no-console
  // console.log(`in routes.js, is user?: ${JSON.stringify(user)}`);

  const [userLoggedIn, setUserLoggedIn] = useState([]);

  const [availableRoutes, setRoutes] = useState({});

  useCallback(() => {
    if (user) {
      setUserLoggedIn(user);
    } else {
      setUserLoggedIn([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserLoggedIn(user);
      // console.log(`Dashboard Navbar, is user logged in?: ${userLoggedIn}`);
      setRoutes(routes);
      // console.log(`setting to routes: ${routes}`);
      // console.log(`typeof routes: ${typeof routes}`);
    } else {
      // console.log(`Dashboard Navbar, is user logged in?: ${userLoggedIn}`);
      setRoutes(loginRoutes);
      // console.log(`setting to loginRoutes: ${loginRoutes}`);
      // console.log(`typeof loginRoutes: ${typeof loginRoutes}`);
    }
    // console.log(`typeof availableRoutes: ${typeof availableRoutes}`);
  }, [userLoggedIn]);

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const configsButton = (
    <SuiBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SuiBox>
  );

  const getRoutes = (allRoutes) => {
    // console.log(allRoutes);
    let routing = null;
    if (allRoutes !== null && allRoutes.length > 0) {
      // return null;
      // }
      // return null;
      routing = allRoutes.map((route) => {
        // console.log(route);
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      });
    }
    return routing;
  };

  return (
    // <Router>
    // <AuthProvider>
    <div className="flex flex-col min-h-screen overflow-hidden">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HouseholdDashboardLayout>
          <HouseholdDashboardNavbar />
          {/* {layout === "household-app-dashboard" && ( */}
          {/* <> */}
          {/* <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Soft UI Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          /> */}
          {/* <Configurator /> */}
          {/* {configsButton} */}
          {/* </> */}
          {/* )} */}
          {/* {layout === "vr" && <Configurator />} */}
          {/* <HouseHoldDashboard /> */}
          {/* <Router> */}
          <Routes>
            {/* <PrivateRoute component={ProtectedPage} path="/protected" exact /> */}
            {/* <Route path="/" element={<PrivateRoute />}> */}
            {/* {getRoutes(availableRoutes)} */}
            {/* <Route path="/" element={<PrivateRoute />}> */}
            {/* </PrivateRoute> */}
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/*" element={<Records />} />
              {getRoutes(routes)}
            </Route>
            {/* <Route exact path="/*" element={<Navigate to="home/" />} /> */}
            {/* </Route> */}
            {/* </Route> */}
            {getRoutes(loginRoutes)}
          </Routes>
          {/* </Router> */}
          {/* <Footer /> */}
        </HouseholdDashboardLayout>
      </ThemeProvider>
    </div>
    // </Router>
  );
}
