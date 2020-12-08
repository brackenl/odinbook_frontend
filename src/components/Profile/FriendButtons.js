import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

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
  receivedReqs,
  acceptFriendReq,
  declineFriendReq,
}) => {
  const classes = useStyles();

  return (
    <div>
      {friendsArr.includes(loggedInUser.id) ? ( // CHECK IF THE USER IS ALREADY A FRIEND
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
      ) : friendReqsArr.includes(loggedInUser.id) ? ( // CHECK IF THERE IS THE USER HAS ALREADY SENT A FRIEND REQ TO THE PROFILE OWNER
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
      ) : receivedReqs.includes(user._id) ? ( // CHECK IF THE PROFILE OWNER HAS SENT A FRIEND REQ TO THE USER
        <>
          <Button
            variant="outlined"
            className={classes.button}
            style={{ color: "green", borderColor: "green", width: "45%" }}
            startIcon={<CheckCircleIcon />}
            onClick={() => acceptFriendReq(user._id)}
          >
            Accept Friend Request
          </Button>
          <Button
            variant="outlined"
            className={classes.dangerButton}
            style={{ width: "45%" }}
            startIcon={<CancelIcon />}
            onClick={() => declineFriendReq(user._id)}
          >
            Decline Friend Request
          </Button>
        </>
      ) : (
        // OFFER THE USER THE OPPORTUNITY TO SEND A FRIEND REQ
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
