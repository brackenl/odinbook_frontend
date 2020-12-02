import React, { useState } from "react";
import { useField, Form, FormikProps, Formik } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

const EditImageForm = ({ user, toggleEditImage, handleUpdateImage }) => {
  const [imageFile, setImageFile] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" style={{ margin: "10px 8px" }}>
        Update Image
      </Typography>

      <TextField
        id="img-file"
        name="img-file"
        onChange={(e) => handleChange(e)}
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        InputProps={{
          className: classes.textField,
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.textFieldLabel,
        }}
        variant="outlined"
        className={classes.textField}
        type="file"
      />

      <Button
        variant="outlined"
        className={classes.button}
        type="submit"
        onClick={() => handleUpdateImage(imageFile)}
      >
        Save image
      </Button>
      <Button
        variant="outlined"
        className={classes.dangerButton}
        type="reset"
        onClick={toggleEditImage}
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditImageForm;
