import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ImageIcon from "@material-ui/icons/Image";

import FriendButtons from "./FriendButtons";

import axios from "../../utils/axios";
import axiosFns from "../../utils/axiosFns";

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
  toggleEditImage,
}) => {
  const [friendsArr, setFriendsArr] = useState([]);
  const [friendReqsArr, setFriendReqsArr] = useState([]);
  const [receivedReqs, setReceivedReqs] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  const { handleAcceptRequest, handleDeclineRequest } = axiosFns({
    userFriends: friendsArr,
    setUserFriends: setFriendsArr,
    friendRequests: receivedReqs,
    setFriendRequests: setReceivedReqs,
  });

  useEffect(() => {
    const filteredFriendsArr = user.friends.map((friend) => friend._id);
    const filteredFriendReqsArr = user.friendRequests.map(
      (friend) => friend._id
    );

    setFriendsArr(filteredFriendsArr);
    setFriendReqsArr(filteredFriendReqsArr);
  }, [user]);

  useEffect(() => {
    axios.get(`/users/${loggedInUser.id}`).then((result) => {
      const loggedInUserFriendReqs = result.data.user.friendRequests.map(
        (friend) => friend._id
      );
      setReceivedReqs(loggedInUserFriendReqs);
    });
  }, []);

  const acceptFriendReq = (id) => {
    handleAcceptRequest(id);
    history.push("/temp");
    history.goBack();
  };

  const declineFriendReq = (id) => {
    handleDeclineRequest(id);
    history.push("/temp");
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <div className={classes.avatarContainer}>
        <img src={user.profilePicUrl} className={classes.avatar} />
      </div>
      <div className={classes.textContainer}>
        <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
        {user._id != loggedInUser.id ? (
          <FriendButtons
            user={user}
            friendsArr={friendsArr}
            friendReqsArr={friendReqsArr}
            loggedInUser={loggedInUser}
            handleRemoveFriend={handleRemoveFriend}
            handleCancelFriendReq={handleCancelFriendReq}
            handleFriendReq={handleFriendReq}
            receivedReqs={receivedReqs}
            acceptFriendReq={acceptFriendReq}
            declineFriendReq={declineFriendReq}
          />
        ) : (
          <>
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={<AccountBoxIcon />}
              onClick={toggleEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={<ImageIcon />}
              onClick={toggleEditImage}
            >
              Edit Profile Photo
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
