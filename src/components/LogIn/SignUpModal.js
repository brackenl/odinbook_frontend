import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "182px",
    },
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    borderRadius: 5,
  },
  modalStyle: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  textField: {
    // backgroundColor: "rgb(245, 246, 247)",
    border: "1px solid rgb(204, 208, 213)",
    borderRadius: 5,
  },
  longTextField: {
    width: "380px",
  },
}));

const SignUpModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  const handleClick = () => {
    props.handleSignUp(firstName, lastName, email, password);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    // props.toggle();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.toggle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          className={`${classes.root} ${classes.paper} ${classes.modalStyle}`}
        >
          <Typography variant="h4">Sign up</Typography>
          <Typography variant="body1" style={{ marginBottom: 10 }}>
            It's quick and easy.
          </Typography>
          <Divider />
          <div style={{ marginTop: 10 }}>
            <TextField
              required
              id="firstNameInput"
              placeholder="First name"
              variant="outlined"
              className={`${classes.textField}`}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <TextField
              required
              id="lastNameInput"
              placeholder="Last name"
              variant="outlined"
              className={`${classes.textField}`}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <TextField
              id="emailInput"
              placeholder="Email"
              variant="outlined"
              style={{ width: "380px" }}
              className={`${classes.textField} ${classes.longTextField}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              id="passwordInput"
              placeholder="New password"
              variant="outlined"
              fullWidth
              style={{ width: "380px" }}
              type="password"
              className={`${classes.textField} ${classes.longTextField}`}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {props.signupErrors
              ? props.signupErrors.map((error) => (
                  <div
                    style={{ color: "red", display: "block", width: "100%" }}
                  >
                    {error.msg}
                  </div>
                ))
              : null}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "rgb(72,182,54)",
                  width: "50%",
                  color: "white",
                  margin: "0 auto",
                }}
                onClick={handleClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpModal;
