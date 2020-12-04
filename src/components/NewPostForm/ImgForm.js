import React, { useState } from "react";

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
  buttonContainer: {
    width: "100%",
  },
  button: {
    color: "white",
    borderColor: "white",
    marginTop: 10,
    width: "100%",
  },
  dangerButton: {
    borderColor: "rgb(242,16,90)",
    color: "rgb(242,16,90)",
    marginTop: 10,
    width: "100%",
  },
}));

const ImgForm = ({
  imageFile,
  imgPreview,
  setImageFile,
  setImgPreview,
  handleSubmit,
}) => {
  // const [imageFile, setImageFile] = useState(null);
  // const [imgPreview, setImgPreview] = useState(null);
  const classes = useStyles();

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleCancel = () => {
    setImageFile(null);
    setImgPreview(null);
  };

  return (
    <div className={classes.root}>
      {imgPreview ? (
        <div style={{ width: "100%" }}>
          <img src={imgPreview} width="100%" />
        </div>
      ) : (
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
      )}
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          className={classes.button}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          className={classes.dangerButton}
          type="reset"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ImgForm;
