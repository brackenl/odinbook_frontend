import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";

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

const NewPostForm = ({ user }) => {
  const classes = useStyles();

  const getInitials = () => {
    const splitNames = user.name.split(" ");
    console.log(splitNames);
    return `${splitNames[0][0]}${splitNames[1][0]}`;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
    }
  };

  if (!user) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Avatar
        alt={user.name}
        src={user.profilePicUrl ? user.profilePicUrl : ""}
      >
        {user.profilePicUrl ? null : getInitials()}
      </Avatar>
      <TextField
        placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
        variant="outlined"
        className={classes.textField}
        InputProps={{
          className: classes.textField,
        }}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default NewPostForm;
