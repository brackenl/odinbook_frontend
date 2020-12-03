import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    borderColor: "white",
    margin: "10px 10px",
  },
  dangerButton: {
    marginTop: 10,
    borderColor: "rgb(242,16,90)",
    color: "rgb(242,16,90)",
    margin: "10px 10px",
  },
}));

const FriendButtons = ({
  user,
  friendsArr,
  friendReqsArr,
  loggedInUser,
  handleRemoveFriend,
  handleCancelFriendReq,
  handleFriendReq,
}) => {
  const classes = useStyles();

  return (
    <div>
      {friendsArr.includes(loggedInUser.id) ? (
        <>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<PeopleIcon />}
          >
            Friend
          </Button>
          <Button
            variant="outlined"
            className={classes.dangerButton}
            startIcon={<DeleteIcon />}
            onClick={() => handleRemoveFriend(user._id)}
          >
            Remove friend
          </Button>
        </>
      ) : friendReqsArr.includes(loggedInUser.id) ? (
        <>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<HourglassEmptyIcon />}
          >
            Friend Request Sent
          </Button>
          <Button
            variant="outlined"
            className={classes.dangerButton}
            startIcon={<CloseIcon />}
            onClick={() => handleCancelFriendReq(user._id)}
          >
            Cancel friend request
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<PersonAddIcon />}
          onClick={() => handleFriendReq(user._id)}
        >
          Send Friend Request
        </Button>
      )}
    </div>
  );
};

export default FriendButtons;
