/* eslint-disable no-console */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
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
import SuiInput from "components/SuiInput";
// import TextField from "@material-ui/core/TextField";
// import React, { useState } from "react";
import {
  Button,
  Paper,
  Dialog,
  Card,
  Container,
  FormControlLabel,
  Box,
  Typography,
  Grid,
  Checkbox,
  FormControl,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "context/AuthContext";
import Form from "./Form";

function OtherForm({ callback, fetchData }) {
  const initialFormData = Object.freeze({
    roomName: "Unique Room Name",
    roomDescription: "20 x 20",
    rent: "1000.00",
    capacity: "2",
    roomId: "NewRoomID",
  });
  const [roomName, setRoomName] = useState("");
  const [formData, updateFormData] = React.useState(initialFormData);
  const { createRoom } = useContext(AuthContext);
  const handleChange = (e) => {
    console.log(`updating: ${e.target.name} ${e.target.value.trim()}`);
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  //   const { handleSubmit, reset, control, register } = useForm();
  //   const onSubmit = (data) => console.log(JSON.stringify(data));
  const submitting = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // console.log(e.currentTarget.elements);
    console.log(formData);
    createRoom(formData);
    callback();
    fetchData();
    // console.log(data);
  };
  //
  //   const aController = (
  //     <Controller
  //       name="acceptTerms"
  //       control={control}
  //       defaultValue="false"
  //       inputRef={register()}
  //       render={({ field: { onChange } }) => (
  //         <Checkbox color="primary" onChange={(e) => onChange(e.target.checked)} />
  //       )}
  //     />
  //   );
  return (
    <Paper>
      <Box px={3} py={2}>
        <SuiBox component="form" onSubmit={submitting} id="myForm">
          {/* <FormControl> */}
          <Typography variant="h6" align="center" margin="dense">
            Create a New Room
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="roomId"
                name="roomId"
                label="Room ID"
                margin="dense"
                defaultValue="NewRoomID"
                // onChange={(e) => setRoomName(e.target.value)}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="roomName"
                name="roomName"
                label="Room Name"
                margin="dense"
                defaultValue="Unique Room Name"
                // onChange={(e) => setRoomName(e.target.value)}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="roomDescription"
                name="roomDescription"
                label="Room Description"
                fullWidth
                margin="dense"
                defaultValue="20 x 20"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="rent"
                name="rent"
                label="Rent"
                fullWidth
                margin="dense"
                defaultValue="1000.00"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="capacity"
                name="capacity"
                label="Capacity"
                fullWidth
                margin="dense"
                defaultValue="2"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button variant="contained" color="primary" type="submit" form="myForm">
              Register
            </Button>
          </Box>
          {/* </FormControl> */}
        </SuiBox>
      </Box>
    </Paper>
  );
}

function FormWithoutHookForm() {
  const [textValue, setTextValue] = useState("");
  const { register, handleSubmit, errors, reset, control } = useForm();

  const onTextChange = (e) => {
    setTextValue(e.target.value);
    console.log(e.target.value);
  };

  const submitForm = async (data) => {
    console.log("Submission starting", data);
    // const result = await postData(data);
    // console.log("Submitting complete", result.success);
  };
  //   const handleSubmit = () => console.log(textValue);
  const handleReset = () => setTextValue("");
  //   const { register } = useForm();
  //   const { handleSubmit, reset, control } = useForm();
  //   const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    console.log("submitted data");
    console.log(data.length);
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  };

  return (
    // <Paper p="2rem">
    <Container maxWidth="sm">
      <form>
        {/* <Controller
          name="textValue"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value} label="Text Value" />
          )}
        /> */}
        <h2>Form Demo</h2>
        <Controller
          defaultValue=""
          name="textValue"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value} label="Text Value" />
          )}
        />

        {/* <TextField
          onChange={onTextChange}
          value={textValue}
          label="Text Value" // optional
        /> */}
        {/* <FormInputText name="textInput" control={control} label="Text Input" /> */}
        {/* <SuiInput onChange={onTextChange} type="text" placeholder="Text" /> */}
        <SuiInput type="text" placeholder="Text" />

        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        <Button onClick={handleReset}>Reset</Button>
        {/* // </Paper> */}
      </form>
    </Container>
  );
}

function CreateRoomDialog({ onSubmit, fetchData }) {
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
            {/* <FormWithoutHookForm /> */}
            {/* <Form /> */}
            <OtherForm callback={handleClose} fetchData={fetchData} />
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
