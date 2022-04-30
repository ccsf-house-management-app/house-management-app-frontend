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

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React context
import { useSoftUIController, setLayout } from "context";

function HouseholdDashboardLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  // const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "household-app-dashboard");
  }, [pathname]);

  return (
    <SuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 0,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: controller ? pxToRem(10) : pxToRem(50),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </SuiBox>
  );
}

// Typechecking props for the DashboardLayout
HouseholdDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HouseholdDashboardLayout;
