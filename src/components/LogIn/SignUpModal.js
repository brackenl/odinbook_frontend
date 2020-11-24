import React from "react";

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
    backgroundColor: "rgb(245, 246, 247)",
    border: "1px solid rgb(204, 208, 213)",
    borderRadius: 5,
  },
}));

const SignUpModal = (props) => {
  const classes = useStyles();

  const body = (
    <div className={`${classes.root} ${classes.paper} ${classes.modalStyle}`}>
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
          variant="filled"
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
        />
        <TextField
          required
          id="lastNameInput"
          placeholder="Last name"
          variant="filled"
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
        />
        <TextField
          id="emailInput"
          placeholder="Mobile number or email"
          variant="filled"
          style={{ width: "380px", marginRight: 8 }}
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
        />
        <TextField
          id="passwordInput"
          placeholder="New password"
          variant="filled"
          fullWidth
          style={{ width: "380px" }}
          InputProps={{ disableUnderline: true }}
          className={classes.textField}
        />
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            variant="contained"
            // className={classes.button}
            style={{
              backgroundColor: "rgb(72,182,54)",
              width: "50%",
              color: "white",
              margin: "0 auto",
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
      {/* <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.toggle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SignUpModal;
