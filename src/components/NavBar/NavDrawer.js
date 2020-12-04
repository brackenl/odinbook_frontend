import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";

import UserAvatar from "../UserAvatar";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  paper: {
    background: "rgb(32,33,34)",
    color: "white",
  },
});

const NavDrawer = ({ user, drawerOpen, toggleDrawer, handleLogOut }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (address) => {
    history.push(address);
    toggleDrawer();
  };

  return (
    <div>
      <React.Fragment>
        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          classes={{ paper: classes.paper }}
        >
          <List className={classes.list}>
            <ListItem button onClick={() => handleClick(`/users/${user.id}`)}>
              <ListItemIcon>
                <UserAvatar user={user} />
              </ListItemIcon>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleClick("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
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
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" onClick={handleLogOut} />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default NavDrawer;
