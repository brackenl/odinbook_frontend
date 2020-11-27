import React from "react";
import formatDistance from "date-fns/formatDistance";

import UserAvatar from "../UserAvatar";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

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
  },
  postTime: {
    textAlign: "left",
  },
  postContent: {
    display: "flex",
    justifyContent: "flex-start",
    textAlign: "left",
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();

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
    </div>
  );
};

export default Post;
