import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import UserAvatar from "../UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "left",
    marginTop: 20,
  },
  contentContainer: {
    marginLeft: 10,
  },
  authorInfo: {
    fontWeight: "bold",
  },
  comment: {},
}));

const Comment = ({ comment, handleLikeComment, postId }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UserAvatar user={comment.user} />
      <div className={classes.contentContainer}>
        <Typography
          variant="body2"
          className={classes.authorInfo}
        >{`${comment.user.first_name} ${comment.user.last_name}`}</Typography>
        <Typography variant="body2" className={classes.comment}>
          {comment.comment}
        </Typography>
        <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
          <IconButton
            aria-label="like comment"
            // className={classes.margin}
            size="small"
            style={{ marginRight: 5 }}
            onClick={() => handleLikeComment(postId, comment._id)}
          >
            <ThumbUpIcon fontSize="inherit" style={{ color: "white" }} />
          </IconButton>
          <Typography variant="body2" className={classes.comment}>
            {`${comment.likes.length}`}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Comment;
