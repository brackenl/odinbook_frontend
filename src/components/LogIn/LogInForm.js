import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import SignUpModal from "./SignUpModal";
import Facebook from "./Facebook";
// import AltFacebookBttn from "./AltFacebookBttn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: 8,
    boxShadow: "1px 1px 20px 0px rgba(194,194,194,1)",
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

const LogInForm = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    props.handleLogIn(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className={classes.root}>
      <SignUpModal
        open={modalOpen}
        toggle={toggleModalOpen}
        handleSignUp={props.handleSignUp}
      />
      <TextField
        className={classes.textField}
        id="email-input"
        style={{ margin: 8, width: "100%" }}
        placeholder="Email"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        onKeyPress={handleKeyPress}
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
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleClick}
      >
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "8px",
        }}
      >
        <Facebook handleFBLogin={props.handleFBLogin} />
        {/* <AltFacebookBttn /> */}
      </div>
    </div>
  );
};

export default LogInForm;
