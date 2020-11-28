import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";

import UserAvatar from "../UserAvatar";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";

import CommentContainer from "../Comments/CommentContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  postAuthorInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  postAuthorName: {
    textAlign: "left",
    fontWeight: "bold",
  },
  postTime: {
    textAlign: "left",
  },
  postContent: {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  button: {
    // margin: theme.spacing(1),
    width: "calc(50% - 20px)",
    margin: "0 10px",
    color: "white",
    backgroundColor: "rgb(32,33,34)",
  },
  buttonIcon: {
    color: "white",
    marginRight: 10,
  },
}));

const Post = ({
  user,
  post,
  handleCommentSubmit,
  handleLikePost,
  handleLikeComment,
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const classes = useStyles();

  const toggleShowCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  return (
    <div className={classes.root}>
      <div className={classes.postAuthorInfoContainer}>
        <UserAvatar user={post.author} />
        <div style={{ flexDirection: "column", marginLeft: 15 }}>
          <Typography className={classes.postAuthorName} variant="body1">
            {`${post.author.first_name} ${post.author.last_name}`}
          </Typography>
          <Typography className={classes.postTime} variant="body2">
            {formatDistance(new Date(post.timestamp), new Date(), {
              addSuffix: true,
            })}
          </Typography>
        </div>
      </div>
      <div>
        <Typography className={classes.postContent} variant="body1">
          {post.content}
        </Typography>
      </div>
      {post.imgUrl && <img src={post.imgUrl} />}
      <Typography className={classes.postTime} variant="body2">
        {post.likes.length === 1 ? "1 like" : `${post.likes.length} likes`}
      </Typography>
      <Divider />
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<ThumbUpIcon className={classes.buttonIcon} />}
          onClick={() => handleLikePost(post._id)}
        >
          Like
        </Button>
        <Button
          variant="outlined"
          className={classes.button}
          startIcon={<CommentIcon className={classes.buttonIcon} />}
          onClick={toggleShowCommentForm}
        >
          Comment
        </Button>
      </div>
      <Divider />
      <CommentContainer
        post={post}
        showCommentForm={showCommentForm}
        user={user}
        handleCommentSubmit={handleCommentSubmit}
        handleLikeComment={handleLikeComment}
      />
    </div>
  );
};

export default Post;
