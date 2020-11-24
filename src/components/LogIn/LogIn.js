import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import LogInForm from "./LogInForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10% 10%",
    height: "100%",
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "10%",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/odinbook-logo-blue.png"}
              height="50px"
              width="200px"
            />
          </div>
          <Typography
            variant="h6"
            style={{ textAlign: "left", margin: "0 30px 0 15px" }}
          >
            Connect with friends and the world around you on Odinbook.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <LogInForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
