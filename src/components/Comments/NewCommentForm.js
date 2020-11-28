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
    height: "50px",
  },
}));

const NewCommentForm = ({ postId, user, handleCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const classes = useStyles();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCommentSubmit(postId, commentText);
      setCommentText("");
    }
  };

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <UserAvatar user={user} />
      <TextField
        placeholder={`Write your comment...`}
        variant="outlined"
        className={classes.textField}
        InputProps={{
          className: classes.textField,
        }}
        onKeyPress={handleKeyPress}
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
      />
    </div>
  );
};

export default NewCommentForm;
