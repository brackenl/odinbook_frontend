import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import SignUpModal from "./SignUpModal";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
    margin: 8,
  },
  fbButton: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    heigh: "100px",
  },
}));

const LogInForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className={classes.root}>
      <SignUpModal open={modalOpen} toggle={toggleModalOpen} />
      <TextField
        className={classes.textField}
        id="email-input"
        style={{ margin: 8, width: "100%" }}
        placeholder="Email or Phone Number"
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        id="password-input"
        style={{ margin: 8, width: "100%" }}
        placeholder="Password"
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
      />
      <Button variant="contained" color="secondary" className={classes.button}>
        Log In
      </Button>
      <Divider />
      <Button
        variant="contained"
        className={classes.button}
        style={{
          backgroundColor: "rgb(72,182,54)",
          margin: "16px 20%",
          color: "white",
        }}
        onClick={toggleModalOpen}
      >
        Create New Account
      </Button>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          class="fb-login-button"
          data-size="large"
          data-button-type="login_with"
          data-layout="rounded"
          data-auto-logout-link="false"
          data-use-continue-as="false"
          data-width=""
        ></div>
      </div>
    </div>
  );
};

export default LogInForm;
