import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "scroll",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    marginBottom: 20,
  },
}));

const PostContainer = ({
  user,
  posts,
  handleCommentSubmit,
  handleLikePost,
  handleLikeComment,
  handleScroll,
}) => {
  const classes = useStyles();

  if (!posts.length) {
    return <div className="loader">Loading...</div>;
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
