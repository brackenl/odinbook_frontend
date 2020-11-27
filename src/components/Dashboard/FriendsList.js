import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import UserAvatar from "../UserAvatar";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(32,33,34)",
  },
  tickIcon: {
    color: "green",
  },
  crossIcon: {
    color: "red",
  },
}));

const FriendsList = ({ friends, friendRequests }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" style={{ textAlign: "left" }}>
        Friend requests
      </Typography>
      <List component="nav" aria-label="[top] friends list">
        {friendRequests.slice(0, 3).map((requester, index) => {
          return (
            <div key={requester._id}>
              <ListItem button>
                <ListItemIcon>
                  <UserAvatar user={requester} />
                </ListItemIcon>
                <ListItemText
                  primary={`${requester.first_name} ${requester.last_name}`}
                />
                <ListItemIcon>
                  <CheckCircleIcon className={classes.tickIcon} />
                </ListItemIcon>
                <ListItemIcon>
                  <CancelIcon className={classes.crossIcon} />
                </ListItemIcon>
              </ListItem>
              {friendRequests[index + 1] ? <Divider /> : null}
            </div>
          );
        })}
      </List>
      <Typography variant="h6" style={{ textAlign: "left" }}>
        Friends
      </Typography>
      <List component="nav" aria-label="[top] friends list">
        {friends.map((friend, index) => {
          return (
            <div key={friend._id}>
              <ListItem button>
                <ListItemIcon>
                  <UserAvatar user={friend} />
                </ListItemIcon>
                <ListItemText
                  primary={`${friend.first_name} ${friend.last_name}`}
                />
              </ListItem>
              {friends[index + 1] ? <Divider /> : null}
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default FriendsList;
