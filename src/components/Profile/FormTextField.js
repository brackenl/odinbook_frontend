import React from "react";
import { useField } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  textField: {
    // margin: "10px 100px 10px 10px",
    color: "white",
  },
  textFieldLabel: {
    color: "white",
  },
}));

const FormTextField = ({ formikKey, ...props }) => {
  const classes = useStyles();
  const [field, meta, helpers] = useField(formikKey);

  return (
    <>
      <TextField
        id={field.name}
        name={field.name}
        helperText={meta.touched ? meta.error : ""}
        error={meta.touched && Boolean(meta.error)}
        value={field.value}
        onChange={field.onChange}
        {...props}
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
      />
    </>
  );
};

export default FormTextField;

/*
export const FormikTextField = ({
  formikKey,
  ...props
}) => {
  const [field, meta, helpers] = useField(formikKey);
  return (
    <TextField
      id={field.name}
      name={field.name}
      helperText={meta.touched ? meta.error : ""}
      error={meta.touched && Boolean(meta.error)}
      value={field.value}
      onChange={field.onChange}
      {...props}
    />
  );
};
*/
