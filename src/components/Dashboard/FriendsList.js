import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import UserAvatar from "../UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(32,33,34)",
    textAlign: "left",
  },
  tickIcon: {
    color: "green",
  },
  crossIcon: {
    color: "red",
  },
  subheader: {
    color: "white",
  },
}));

const FriendsList = ({
  friends,
  friendRequests,
  handleAcceptRequest,
  handleDeclineRequest,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleFriendClick = (id) => {
    history.push(`/users/${id}`);
  };

  return (
    <div className={classes.root}>
      {/* <Typography variant="h6">Friend requests</Typography> */}
      <List
        component="nav"
        aria-label="friend requests list"
        subheader={
          <ListSubheader className={classes.subheader}>
            Friend Requests
          </ListSubheader>
        }
      >
        {friendRequests.slice(0, 3).map((requester, index) => {
          return (
            <div key={requester._id}>
              <ListItem button onClick={() => handleFriendClick(requester._id)}>
                <ListItemIcon>
                  <UserAvatar user={requester} />
                </ListItemIcon>
                <ListItemText
                  primary={`${requester.first_name} ${requester.last_name}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleAcceptRequest(requester._id)}
                  >
                    <CheckCircleIcon className={classes.tickIcon} />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDeclineRequest(requester._id)}
                  >
                    <CancelIcon className={classes.crossIcon} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {friendRequests[index + 1] ? <Divider /> : null}
            </div>
          );
        })}
      </List>
      <List
        component="nav"
        aria-label="[top] friends list"
        subheader={
          <ListSubheader className={classes.subheader}>Friends</ListSubheader>
        }
      >
        {friends.map((friend, index) => {
          return (
            <div key={friend._id}>
              <ListItem button onClick={() => handleFriendClick(friend._id)}>
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
