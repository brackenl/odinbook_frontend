import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "scroll",

    // hide the scrollbar
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "&-ms-overflow-style": "none",
    "scrollbar-width": "none",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    margin: "0 0px 20px 0px",
  },
  noPost: {
    color: "white",
  },
}));

const PostContainer = ({
  user,
  posts,
  handleCommentSubmit,
  handleLikePost,
  handleLikeComment,
  handleScroll,
  loadingPosts,
}) => {
  const classes = useStyles();

  if (loadingPosts) {
    return <div className="loader">Loading...</div>;
  }

  if (!posts.length) {
    return (
      <Paper className={classes.paper}>
        <div className={classes.noPost}>No posts here...</div>
      </Paper>
    );
  }

  return (
    <div onScroll={handleScroll} className={classes.root}>
      {posts.map((post) => {
        return (
          <Paper className={classes.paper} key={post._id}>
            <Post
              post={post}
              user={user}
              handleCommentSubmit={handleCommentSubmit}
              handleLikePost={handleLikePost}
              handleLikeComment={handleLikeComment}
            />
          </Paper>
        );
      })}
    </div>
  );
};

export default PostContainer;
