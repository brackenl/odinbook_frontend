import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

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

const EditProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

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
        validationSchema={EditProfileSchema}
        onSubmit={(values, { resetForm }) => {
          handleUpdateProfile(values);
          resetForm();
          toggleEditProfile();
        }}
      >
        {({ handleChange, setFieldTouched, isValid }) => {
          const change = (name, e) => {
            e.persist();
            handleChange(e);
            setFieldTouched(name, true, false);
          };

          return (
            <Form>
              <FormTextField
                formikKey="firstName"
                name="firstName"
                type="text"
                label="First Name"
                onChange={(e) => change("firstName", e)}
              />
              <FormTextField
                formikKey="lastName"
                name="lastName"
                type="text"
                label="Last Name"
                onChange={(e) => change("lastName", e)}
              />
              <FormTextField
                formikKey="email"
                name="email"
                type="email"
                label="Email"
                onChange={(e) => change("email", e)}
              />
              <FormTextField
                formikKey="password"
                name="password"
                type="password"
                label="Password"
                onChange={(e) => change("password", e)}
              />
              <FormTextField
                formikKey="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                onChange={(e) => change("confirmPassword", e)}
              />

              <Button
                variant="outlined"
                className={classes.button}
                type="submit"
                onClick={Formik.handleSubmit}
                disabled={!isValid}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfileForm;
