import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import axios from "../../utils/axios";

import NewPostForm from "../NewPostForm";
import PostContainer from "../Posts/PostContainer";
import LinkList from "./LinkList";
import FriendsList from "./FriendsList";

import axiosFns from "../../utils/axiosFns";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(23, 24, 25)",
    minHeight: "100vh",
    marginTop: "10px",
  },
  grid: {
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    marginBottom: 20,
  },
}));

const Dashboard = ({ user }) => {
  const [posts, setPosts] = useState(null);
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const classes = useStyles();

  const {
    getPosts,
    handlePostSubmit,
    handleLikePost,
    handleCommentSubmit,
    handleLikeComment,
  } = axiosFns(posts, setPosts, user);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`/users/${user.id}`).then((results) => {
        setUserFriends(results.data.user.friends);
        setFriendRequests(results.data.user.friendRequests);
      });
    }
  }, [user]);

  const handleAcceptRequest = (id) => {
    axios
      .put(`/users/friends/accept`, {
        relUserId: id,
      })
      .then((result) => {
        const updatedFriends = [...userFriends, result.data.user];
        setUserFriends(updatedFriends);

        const updatedFriendReqs = friendRequests.filter(
          (item) => item._id != id
        );
        setFriendRequests(updatedFriendReqs);
      });
  };

  const handleDeclineRequest = (id) => {
    axios
      .delete(`/users/friends/decline`, {
        data: {
          relUserId: id,
        },
      })
      .then((result) => {
        const updatedFriendReqs = friendRequests.filter(
          (item) => item._id != id
        );
        setFriendRequests(updatedFriendReqs);
      });
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Hidden mdDown>
          <Grid item xs={0} md={3}>
            <Paper className={classes.paper}>
              <LinkList user={user} />
            </Paper>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <NewPostForm user={user} handlePostSubmit={handlePostSubmit} />
          </Paper>
          <PostContainer
            user={user}
            posts={posts}
            handleCommentSubmit={handleCommentSubmit}
            handleLikePost={handleLikePost}
            handleLikeComment={handleLikeComment}
          />
        </Grid>
        <Hidden mdDown>
          <Grid item xs={0} md={3}>
            <Paper className={classes.paper}>
              <FriendsList
                friends={userFriends}
                friendRequests={friendRequests}
                handleAcceptRequest={handleAcceptRequest}
                handleDeclineRequest={handleDeclineRequest}
              />
            </Paper>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default Dashboard;
