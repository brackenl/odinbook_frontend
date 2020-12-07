import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import axios from "../../utils/axios";

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
}));

const Friends = ({ user }) => {
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const classes = useStyles();

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
          <Typography variant="h6" className={classes.heading}>
            Friend Requests
          </Typography>
          {friendRequests.map((friend) => {
            return <FriendRequestCard friend={friend} key={friend._id} />;
          })}
          <Typography variant="h6" className={classes.heading}>
            Friends
          </Typography>
          {userFriends.map((friend) => {
            return <FriendCard friend={friend} key={friend._id} />;
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Friends;
