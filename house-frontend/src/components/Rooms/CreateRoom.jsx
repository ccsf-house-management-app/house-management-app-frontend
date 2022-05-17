/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import CustomAddButton from "components/CustomAddRecordButton/CustomAddRecordButton";
import PlaceholderCard from "examples/Cards/PlaceholderCard/index";
import SuiButton from "components/SuiButton/index";
import SuiBox from "components/SuiBox/index";
// import TextField from "@material-ui/core/TextField";
// import React, { useState } from "react";
import { Button, Paper, Dialog, Card, Container } from "@material-ui/core";
import { useForm } from "react-hook-form";

function FormWithoutHookForm() {
  const [textValue, setTextValue] = useState("");

  const onTextChange = (e) => setTextValue(e.target.value);
  const handleSubmit = () => console.log(textValue);
  const handleReset = () => setTextValue("");

  return (
    // <Paper p="2rem">
    <Container maxWidth="sm">
      <h2>Form Demo</h2>

      <TextField
        onChange={onTextChange}
        value={textValue}
        label="Text Value" // optional
      />

      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
      {/* // </Paper> */}
    </Container>
  );
}

function CreateRoomDialog({ onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("Opening Dialog");
  };

  //   useEffect(() => {
  //     setOpen(isOpen);
  //   }, [isOpen]);

  return (
    <>
      {/* <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        Open simple dialog
      </Button> */}
      <CustomAddButton onPress={() => handleOpen()}>
        <PlaceholderCard title={{ variant: "h5", text: "Create New Room" }} outlined />
      </CustomAddButton>
      <div>
        <Dialog sx={{ root: { p: 0 } }} open={open} onClose={handleClose}>
          {/* <SuiBox container> */}
          <DialogContent>
            <FormWithoutHookForm />
          </DialogContent>
          {/* </SuiBox> */}
          {/* <SuiBox> dskjf</SuiBox> */}
          {/* <DialogTitle>Confirm</DialogTitle> */}
          {/* <DialogContent>
            <DialogContentText>Enter your name</DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="name" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <SuiButton onClick={handleClose} autoFocus>
              cancel
            </SuiButton>
            <SuiButton onClick={handleClose} autoFocus>
              ok
            </SuiButton>
          </DialogActions> */}
        </Dialog>
      </div>
    </>
  );
}

export default CreateRoomDialog;
