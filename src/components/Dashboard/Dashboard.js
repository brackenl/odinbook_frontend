import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import NewPostForm from "./NewPostForm";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(23, 24, 25)",
    height: "100vh",
  },
  grid: {
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
  },
}));

const Dashboard = ({ user }) => {
  const classes = useStyles();

  console.log(user);

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <NewPostForm user={user} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
