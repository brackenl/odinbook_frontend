import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import axios from "../../utils/axios";
import axiosFns from "../../utils/axiosFns";

import FriendCard from "./FriendCard";
import FriendRequestCard from "./FriendRequestCard";
import UserSearch from "../UserSearch/UserSearch";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(23, 24, 25)",
    minHeight: "100vh",
    marginTop: "10px",
  },
  grid: {
    justifyContent: "center",
  },
  friendGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyItems: "flex-end",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    marginBottom: 20,
  },
  heading: {
    color: "white",
    textAlign: "left",
    width: "100%",
    marginBottom: 10,
  },
  bodyText: {
    color: "white",
    marginBottom: 20,
    fontSize: 14,
  },
}));

const Friends = ({ user }) => {
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const classes = useStyles();

  const { handleAcceptRequest, handleDeclineRequest } = axiosFns({
    userFriends,
    setUserFriends,
    friendRequests,
    setFriendRequests,
  });

  useEffect(() => {
    if (user) {
      axios.get(`/users/${user.id}`).then((results) => {
        setUserFriends(results.data.user.friends);
        setFriendRequests(results.data.user.friendRequests);
      });
    }
  }, [user]);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={9} className={classes.friendGrid}>
          <Typography variant="h6" className={classes.heading}>
            Search users
          </Typography>
          <UserSearch />
          {friendRequests ? (
            <Typography variant="h6" className={classes.heading}>
              Friend requests
            </Typography>
          ) : null}
          {friendRequests.length > 0 ? (
            friendRequests.map((friend) => {
              return (
                <FriendRequestCard
                  friend={friend}
                  key={friend._id}
                  handleAcceptRequest={handleAcceptRequest}
                  handleDeclineRequest={handleDeclineRequest}
                />
              );
            })
          ) : (
            <Typography variant="body1" className={classes.bodyText}>
              No friend requests!
            </Typography>
          )}
          <Typography variant="h6" className={classes.heading}>
            Friends
          </Typography>
          {userFriends.length > 0 ? (
            userFriends.map((friend) => {
              return <FriendCard friend={friend} key={friend._id} />;
            })
          ) : (
            <Typography variant="body1" className={classes.bodyText}>
              No friends yet!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Friends;
