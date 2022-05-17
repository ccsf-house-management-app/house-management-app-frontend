/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { forwardRef } from "react";
import SuiButton from "components/SuiButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";

const styles = {
  root: {
    padding: 0,
    paddingBottom: ".5rem",
    marginTop: "1.5rem",
    // marginBottom: "5rem",
    "& .MuiPaper-root": {
      width: "96%",
      // backgroundSize: "100% 100%",
      padding: 0,
      //   marginTop: ".5rem",
      margin: 0,
      border: "0.0925rem solid #dee2e6",
      // transition: "none",
      // borderRadius: "100px",
      boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.05);",
    },
    // "&.hover": { boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.05);" },
    // "&.active": {
    //   transform: "translate(100 %)",
    // },
  },
};

function CustomAddButton(props, ...rest) {
  const { classes } = props;
  const { children } = props;
  const { onPress } = props;
  // const { ...rest } = props;
  return (
    <SuiButton variant="light" fullWidth onClick={onPress} className={classes.root}>
      {children}
    </SuiButton>
  );
}

CustomAddButton.defaultProps = { onPress: null };

CustomAddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
  onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
};

export default withStyles(styles)(CustomAddButton);

// // function CustomAddRecordButton({ children }) {
// const CustomAddButton = ({ children }) =>
//   withStyles({
//     root: {
//       padding: 0,
//       paddingBottom: ".5rem",
//       // marginBottom: "5rem",
//       "& .MuiPaper-root": {
//         width: "96%",
//         // backgroundSize: "100% 100%",
//         padding: 0,
//         margin: 0,
//         border: "0.0925rem solid #dee2e6",
//         // borderRadius: "100px",
//         // boxShadow: "0px 5px 5px 5px rgba(0,0,0,0.75);",
//       },
//       // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//       // borderRadius: 3,
//       // border: 0,
//       // color: "white",
//       // height: 48,
//       // padding: "0 100px",
//       // margin: "15",
//       // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     },
//     // paper: {
//     //   padding: 0,
//     // },
//     // label: {
//     //   textTransform: "capitalize",
//     // },
//   })((props) => <SuiButton {...props} />);
// //   return <CustomAddButton />;
// // }

// CustomAddButton.propTypes = { children: PropTypes.object.isRequired };

// export CustomAddButton;
