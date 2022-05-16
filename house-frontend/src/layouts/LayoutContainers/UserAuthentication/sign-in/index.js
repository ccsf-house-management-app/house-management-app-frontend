/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
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

import { useState, useContext } from "react";

// react-router-dom components

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import curved9 from "assets/images/curved-images/curved-6.jpg";
import AuthContext from "context/AuthContext";
// eslint-disable-next-line import/no-duplicates
import { useNavigate, Navigate, Link } from "react-router-dom";
import CoverLayout from "../components/CoverLayout/index";

// Images

function UserSignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { loginUser, user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // setUsername(e.target.username.value);
    // setPassword(e.target.password.value);
    // console.log("Username:", username, "Password: ", password);
    username.length > 0 && loginUser(username, password);
  };

  if (!user) {
    return (
      <CoverLayout
        title="Welcome back"
        description="Enter your email and password to sign in"
        image={curved9}
      >
        <SuiBox component="form" role="form" onSubmit={handleSubmit}>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Username
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="username"
              placeholder="Username"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
          </SuiBox>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SuiTypography>
            </SuiBox>
            <SuiInput
              type="password"
              placeholder="Password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
          </SuiBox>
          <SuiBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SuiTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Remember me
            </SuiTypography>
          </SuiBox>
          <SuiBox mt={4} mb={1}>
            <SuiButton variant="gradient" color="info" fullWidth type="submit">
              sign in
            </SuiButton>
          </SuiBox>
          <SuiBox mt={3} textAlign="center">
            <SuiTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <SuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </CoverLayout>
    );
  }
  return <Navigate to="/records" />;
}

export default UserSignIn;
