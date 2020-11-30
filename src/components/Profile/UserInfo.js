import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

// import UserAvatar from "./UserAvatar";
import FriendButtons from "./FriendButtons";

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
}));

const UserInfo = ({
  user,
  loggedInUser,
  handleFriendReq,
  handleCancelFriendReq,
  handleRemoveFriend,
  toggleEditProfile,
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
        {user._id != loggedInUser.id ? (
          <FriendButtons
            friendsArr={friendsArr}
            friendReqsArr={friendReqsArr}
            loggedInUser={loggedInUser}
            handleRemoveFriend={handleRemoveFriend}
            handleCancelFriendReq={handleCancelFriendReq}
            handleFriendReq={handleFriendReq}
          />
        ) : (
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<AccountBoxIcon />}
            onClick={toggleEditProfile}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
