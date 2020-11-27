import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import UserAvatar from "../UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
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
}));

const NewPostForm = ({ user, handlePostSubmit }) => {
  const [postText, setPostText] = useState("");
  const classes = useStyles();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handlePostSubmit(postText);
      setPostText("");
    }
  };

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className={classes.root}>
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
  );
};

export default NewPostForm;
