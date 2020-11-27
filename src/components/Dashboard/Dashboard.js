import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import axios from "../../utils/axios";

import NewPostForm from "./NewPostForm";
import PostContainer from "../Posts/PostContainer";
import LinkList from "./LinkList";
import FriendsList from "./FriendsList";

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
  const [posts, setPosts] = useState([]);
  // const [userInfo, setUserInfo] = useState({});
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const classes = useStyles();

  const sortPosts = (arr) => {
    const sortedArr = arr.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    return sortedArr;
  };

  useEffect(() => {
    axios.get("/posts").then((results) => {
      setPosts(sortPosts(results.data.posts));
    });
  }, []);

  useEffect(() => {
    if (user) {
      axios.get(`/users/${user.id}`).then((results) => {
        setUserFriends(results.data.user.friends);
        setFriendRequests(results.data.user.friendRequests);
      });
    }
  }, [user]);

  const handlePostSubmit = (postText) => {
    axios.post("/posts", { content: postText }).then((result) => {
      const updatedPosts = [...posts, result.data.post];
      setPosts(sortPosts(updatedPosts));
    });
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={0} md={3}>
          <Paper className={classes.paper}>
            <LinkList user={user} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <NewPostForm user={user} handlePostSubmit={handlePostSubmit} />
          </Paper>
          <PostContainer posts={posts} />
        </Grid>
        <Grid item xs={0} md={3}>
          <Paper className={classes.paper}>
            <FriendsList
              friends={userFriends}
              friendRequests={friendRequests}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
