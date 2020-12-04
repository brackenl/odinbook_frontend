import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";

import UserAvatar from "./UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(32,33,34)",
  },
}));

const LinkList = ({ user }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (address) => {
    history.push(address);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main nav list">
        <ListItem button onClick={() => handleClick(`/users/${user.id}`)}>
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
          <ListItemText
            primary="Friends"
            onClick={() => handleClick(`/friends`)}
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Account"
            onClick={() => handleClick(`/account`)}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default LinkList;
