import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";

import UserAvatar from "../UserAvatar";
import ImgForm from "./ImgForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textFieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textField: {
    backgroundColor: "rgb(51,52,52)",
    color: "white",
    width: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    margin: theme.spacing(1),
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
    color: "white",
    borderColor: "white",
  },
}));

const NewPostForm = ({ user, handlePostSubmit }) => {
  const [postText, setPostText] = useState("");
  const [showImgForm, setShowImgForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const classes = useStyles();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    handlePostSubmit(postText, imageFile);
    setPostText("");
    setShowImgForm(false);
    setImageFile(null);
    setImgPreview(null);
  };

  const toggleImgForm = () => {
    setShowImgForm(!showImgForm);
  };

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.textFieldContainer}>
        <UserAvatar user={user} />
        <TextField
          placeholder={`What's on your mind, ${user.first_name}?`}
          variant="outlined"
          className={classes.textField}
          InputProps={{
            className: classes.textField,
          }}
          onKeyPress={handleKeyPress}
          onChange={(e) => setPostText(e.target.value)}
          value={postText}
        />
      </div>
      {!showImgForm ? (
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<ImageIcon />}
            onClick={toggleImgForm}
          >
            Add Image
          </Button>
        </div>
      ) : (
        <ImgForm
          imageFile={imageFile}
          imgPreview={imgPreview}
          setImageFile={setImageFile}
          setImgPreview={setImgPreview}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default NewPostForm;
