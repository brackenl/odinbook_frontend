import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import axios from "../../utils/axios";

import ConfirmDialog from "./ConfirmDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(23, 24, 25)",
    minHeight: "100vh",
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
    margin: "0 5px 20px 5px",
  },
  avatarContainer: {
    borderRadius: "50%",
    height: "150px",
    width: "100%",
    border: "1px solid rgb(32,33,34)",
    marginBottom: 20,
  },
  avatar: {
    overflow: "hidden",
    borderRadius: "50%",
    height: "150px",
    width: "150px",
  },
  heading: {
    marginBottom: 20,
  },
  button: {
    color: "red",
    borderColor: "red",
    margin: "20px 10px",
  },
}));

const Account = ({ user, setUser }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleDelete = () => {
    setDialogOpen(false);
    setUser("");
    history.push("/login");
    axios.delete(`/users/${user.id}`).then((result) => {});
  };

  if (loading) {
    return <div class="loader">Loading...</div>;
  }

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.heading}>
              My Account
            </Typography>
            <div className={classes.avatarContainer}>
              <img src={user.profilePicUrl} className={classes.avatar} />
            </div>
            <Typography variant="body1">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={<AccountBoxIcon />}
              onClick={toggleDialog}
            >
              Delete account
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <ConfirmDialog
        dialogOpen={dialogOpen}
        toggleDialog={toggleDialog}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

export default Account;
