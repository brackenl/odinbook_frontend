import React from "react";
import { useField, Form, FormikProps, Formik } from "formik";

import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import FormTextField from "./FormTextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: 15,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: "white",
  },
  textFieldLabel: {
    color: "white",
  },
  button: {
    color: "white",
    borderColor: "white",
    margin: "10px 10px",
  },
  dangerButton: {
    borderColor: "rgb(242,16,90)",
    color: "rgb(242,16,90)",
    margin: "10px 10px",
  },
}));

const EditProfileForm = ({ user, toggleEditProfile, handleUpdateProfile }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" style={{ margin: "10px 8px" }}>
        Edit Profile
      </Typography>

      <Formik
        initialValues={{
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values, { resetForm }) => {
          handleUpdateProfile(values);
          resetForm();
          toggleEditProfile();
        }}
      >
        {(props) => (
          <Form>
            <FormTextField name="firstName" type="text" label="First Name" />
            <FormTextField name="lastName" type="text" label="Last Name" />
            <FormTextField name="email" type="email" label="Email" />
            <FormTextField name="password" type="password" label="Password" />
            <FormTextField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />

            <Button
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={Formik.handleSubmit}
            >
              Save changes
            </Button>
            <Button
              variant="outlined"
              className={classes.dangerButton}
              type="reset"
              onClick={toggleEditProfile}
            >
              Cancel changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
