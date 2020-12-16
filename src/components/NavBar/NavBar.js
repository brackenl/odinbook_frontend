import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";

import NavDrawer from "./NavDrawer";
// import UserSearch from "../UserSearch/UserSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
  },
}));

const NavBar = ({ user, setUser }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogOut = () => {
    setUser("");
    handleClose();
    setDrawerOpen(false);
    history.push("/login");
  };

  const handleLogoClick = () => {
    if (user) {
      history.push("/");
    } else {
      history.push("/login");
    }
  };

  const handleProfileClick = () => {
    history.push(`/users/${user.id}`);
    handleClose();
  };

  const handleAccountClick = () => {
    history.push("/account");
    handleClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          {user ? (
            <Hidden lgUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          ) : null}
          <NavDrawer
            user={user}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
            handleLogOut={handleLogOut}
          />
          <div className={classes.title}>
            <img
              src={process.env.PUBLIC_URL + "/odinbook-logo.png"}
              height="40px"
              width="160px"
              onClick={handleLogoClick}
            />
          </div>
          {user && (
            <div>
              {/* <UserSearch /> */}
              <Hidden mdDown>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem onClick={handleAccountClick}>Account</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </Menu>
              </Hidden>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
