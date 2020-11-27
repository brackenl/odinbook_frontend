import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";

import UserAvatar from "../UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(32,33,34)",
  },
}));

const LinkList = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main nav list">
        <ListItem button>
          <ListItemIcon>
            <UserAvatar user={user} />
          </ListItemIcon>
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </ListItem>
      </List>
    </div>
  );
};

export default LinkList;
