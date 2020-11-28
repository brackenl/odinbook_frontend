import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PeopleIcon from "@material-ui/icons/People";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

// import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    borderRadius: "50%",
    height: "150px",
    width: "150px",
    border: "1px solid rgb(32,33,34)",
  },
  avatar: {
    // marginTop: "-100px",
    overflow: "hidden",
    borderRadius: "50%",
    height: "150px",
    width: "150px",
  },
  textContainer: {
    marginTop: 20,
  },
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

const UserInfo = ({
  user,
  loggedInUser,
  handleFriendReq,
  handleCancelFriendReq,
  handleRemoveFriend,
}) => {
  const [friendsArr, setFriendsArr] = useState([]);
  const [friendReqsArr, setFriendReqsArr] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const filteredFriendsArr = user.friends.map((friend) => friend._id);
    const filteredFriendReqsArr = user.friendRequests.map(
      (friend) => friend._id
    );

    setFriendsArr(filteredFriendsArr);
    setFriendReqsArr(filteredFriendReqsArr);
  }, [user]);

  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        <img src={user.profilePicUrl} className={classes.avatar} />
      </div>
      <div className={classes.textContainer}>
        <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>

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
    </div>
  );
};

export default UserInfo;
