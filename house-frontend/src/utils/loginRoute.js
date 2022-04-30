/* eslint-disable no-unused-vars */
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Document from "examples/Icons/Document";
import UserSignIn from "layouts/LayoutContainers/UserAuthentication/sign-in/index";
import SpaceShip from "examples/Icons/SpaceShip";

const loginRoutes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <UserSignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

console.log(`loginRoutes typeof: ${typeof loginRoutes}`);

export default loginRoutes;
