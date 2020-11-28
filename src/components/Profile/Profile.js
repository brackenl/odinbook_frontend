import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import axios from "../../utils/axios";

import NewPostForm from "../NewPostForm";
import PostContainer from "../Posts/PostContainer";
import UserInfo from "./UserInfo";

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

const Profile = ({ user }) => {
  const [relUser, setRelUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const classes = useStyles();
  const { userId } = useParams();

  const {
    getPosts,
    handlePostSubmit,
    handleLikePost,
    handleCommentSubmit,
    handleLikeComment,
  } = axiosFns(posts, setPosts, relUser);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    axios.get(`/users/${userId}`).then((results) => {
      setRelUser(results.data.user);
    });
  }, []);

  const handleFriendReq = (profileId) => {
    axios
      .post(`/users/friends/req`, {
        relUserId: profileId,
      })
      .then((result) => {
        axios.get(`/users/${userId}`).then((results) => {
          setRelUser(results.data.user);
        });
      });
  };

  const handleCancelFriendReq = (profileId) => {
    axios
      .delete(`/users/friends/cancel`, {
        data: {
          relUserId: profileId,
        },
      })
      .then((result) => {
        const updatedUser = { ...relUser };
        const updatedFriendReqs = updatedUser.friendRequests.filter(
          (item) => item._id != user.id
        );
        updatedUser.friendRequests = updatedFriendReqs;
        setRelUser(updatedUser);
      });
  };

  const handleRemoveFriend = (profileId) => {
    axios
      .delete(`/users/friends/remove`, {
        data: {
          relUserId: profileId,
        },
      })
      .then((result) => {
        setRelUser(result.data.user);
      });
  };

  if (!relUser) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <UserInfo
              user={relUser}
              loggedInUser={user}
              handleFriendReq={handleFriendReq}
              handleRemoveFriend={handleRemoveFriend}
              handleFriendReq={handleFriendReq}
              handleCancelFriendReq={handleCancelFriendReq}
              handleRemoveFriend={handleRemoveFriend}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {relUser._id === user.id ? (
            <Paper className={classes.paper}>
              <NewPostForm user={relUser} handlePostSubmit={handlePostSubmit} />
            </Paper>
          ) : null}
          <PostContainer
            user={relUser}
            posts={posts.filter((post) => post.author._id == relUser._id)}
            handleCommentSubmit={handleCommentSubmit}
            handleLikePost={handleLikePost}
            handleLikeComment={handleLikeComment}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
