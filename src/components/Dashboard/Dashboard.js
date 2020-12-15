import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import axios from "../../utils/axios";

import NewPostForm from "../NewPostForm/NewPostForm";
import PostContainer from "../Posts/PostContainer";
import LinkList from "../LinkList";
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

const Dashboard = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [skip, setSkip] = useState(0);
  const classes = useStyles();
  const history = useHistory();

  if (!user) {
    history.push("/login");
  }

  const {
    getPosts,
    handlePostSubmit,
    handleLikePost,
    handleCommentSubmit,
    handleLikeComment,
    handleAcceptRequest,
    handleDeclineRequest,
  } = axiosFns({
    posts,
    setPosts,
    user,
    skip,
    setLoadingPosts,
    userFriends,
    setUserFriends,
    friendRequests,
    setFriendRequests,
  });

  useEffect(() => {
    getPosts();
  }, [skip]);

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user.id}`)
        .then((results) => {
          setUserFriends(results.data.user.friends);
          setFriendRequests(results.data.user.friendRequests);
        })
        .catch((err) => {
          if (
            err.response &&
            (err.response.status === 500 || err.response.status === 401)
          ) {
            setUser("");
            history.push("/login");
          }
        });
    }
  }, [user]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setSkip(posts.length);
    }
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <div>
        <Grid container spacing={3} className={classes.grid}>
          <Hidden mdDown>
            <Grid item md={3}>
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
              handleScroll={handleScroll}
              loadingPosts={loadingPosts}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item md={3}>
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
      </div>
    </Container>
  );
};

export default Dashboard;
