import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Post from "./Post";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(23, 24, 25)",
    height: "100vh",
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

const PostContainer = ({
  user,
  posts,
  handleCommentSubmit,
  handleLikePost,
  handleLikeComment,
}) => {
  const classes = useStyles();

  return (
    <div>
      {posts.slice(0, 9).map((post) => {
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
