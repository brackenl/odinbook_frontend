import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import axios from "../../utils/axios";

import NewPostForm from "../NewPostForm/NewPostForm";
import PostContainer from "../Posts/PostContainer";
import UserInfo from "./UserInfo";
import LinkList from "../LinkList";

import axiosFns from "../../utils/axiosFns";
import EditProfileForm from "./EditProfileForm";
import EditImageForm from "./EditImageForm";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(23, 24, 25)",
    minHeight: "100vh",
    marginTop: "10px",
  },
  grid: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("lg")]: {
      justifyContent: "flex-start",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    margin: "0 5px 20px 5px",
  },
}));

const Profile = ({ user, setUser }) => {
  const [relUser, setRelUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [profileEditing, setProfileEditing] = useState(false);
  const [imageEditing, setImageEditing] = useState(false);
  const [skip, setSkip] = useState(0);

  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();

  const {
    getPosts,
    handlePostSubmit,
    handleLikePost,
    handleCommentSubmit,
    handleLikeComment,
  } = axiosFns({ posts, setPosts, user, skip, setLoadingPosts });

  useEffect(() => {
    getPosts();
  }, [skip]);

  useEffect(() => {
    axios
      .get(`/users/${userId}`)
      .then((results) => {
        setRelUser(results.data.user);
      })
      .catch((err) => {
        if (err.response.status === 500 || err.response.status === 401) {
          setUser("");
          history.push("/login");
        }
      });
  }, [userId]);

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

  const handleUpdateProfile = (values) => {
    axios.put(`/users/${user.id}`, values).then((result) => {
      const updatedUser = {
        email: result.data.user.email,
        first_name: result.data.user.first_name,
        last_name: result.data.user.last_name,
        token: result.data.token.token,
        id: result.data.user._id,
        profilePicUrl: result.data.user.profilePicUrl,
      };
      setUser(updatedUser);
      setRelUser(result.data.user);
      axios.defaults.headers.common["Authorization"] = result.data.token.token;
    });
  };

  const handleUpdateImage = (imageFile) => {
    const formData = new FormData();
    formData.append("img-file", imageFile);
    axios
      .post(`/users/${user.id}/profileimage`, formData, {})
      .then((result) => {
        const updatedUser = {
          email: result.data.user.email,
          first_name: result.data.user.first_name,
          last_name: result.data.user.last_name,
          token: user.token,
          id: result.data.user._id,
          profilePicUrl: result.data.user.profilePicUrl,
        };
        setUser(updatedUser);
        setRelUser(result.data.user);
        toggleEditImage();
      });
  };

  const toggleEditProfile = () => {
    setProfileEditing(!profileEditing);
  };

  const toggleEditImage = () => {
    setImageEditing(!imageEditing);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setSkip(posts.length);
    }
  };

  if (!relUser) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
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
            {profileEditing ? (
              <EditProfileForm
                user={relUser}
                toggleEditProfile={toggleEditProfile}
                handleUpdateProfile={handleUpdateProfile}
              />
            ) : imageEditing ? (
              <EditImageForm
                user={relUser}
                toggleEditImage={toggleEditImage}
                handleUpdateImage={handleUpdateImage}
              />
            ) : (
              <UserInfo
                user={relUser}
                loggedInUser={user}
                handleFriendReq={handleFriendReq}
                handleRemoveFriend={handleRemoveFriend}
                handleCancelFriendReq={handleCancelFriendReq}
                handleRemoveFriend={handleRemoveFriend}
                toggleEditProfile={toggleEditProfile}
                toggleEditImage={toggleEditImage}
              />
            )}
          </Paper>
        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={6}>
            {relUser._id === user.id ? (
              <Paper className={classes.paper}>
                <NewPostForm
                  user={relUser}
                  handlePostSubmit={handlePostSubmit}
                />
              </Paper>
            ) : null}
            <PostContainer
              user={relUser}
              posts={posts.filter((post) => post.author._id == relUser._id)}
              handleCommentSubmit={handleCommentSubmit}
              handleLikePost={handleLikePost}
              handleLikeComment={handleLikeComment}
              handleScroll={handleScroll}
              loadingPosts={loadingPosts}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
