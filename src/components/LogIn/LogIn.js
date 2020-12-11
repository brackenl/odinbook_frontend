import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";

import axios from "../../utils/axios";

import LogInForm from "./LogInForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10% 10%",
    height: "100%",
  },
  logInContainer: {
    height: "100vh",
    backgroundColor: "rgb(240,242,245)",
    // marginTop: "-120px",
    paddingTop: "8%",
  },
}));

const Login = ({ user, setUser }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogIn = (email, password) => {
    // console.log(email, password);
    axios.post("/auth/login", { email, password }).then((result) => {
      const user = {
        email: result.data.user.email,
        first_name: result.data.user.first_name,
        last_name: result.data.user.last_name,
        token: result.data.token.token,
        id: result.data.user.id,
        profilePicUrl: result.data.user.profilePicUrl,
      };
      setUser(user);
      axios.defaults.headers.common["Authorization"] = result.data.token.token;
      history.push("/");
    });
  };

  const handleSignUp = (firstName, lastName, email, password) => {
    axios
      .post("/auth/signup", { firstName, lastName, email, password })
      .then((result) => {
        const user = {
          email: result.data.user.email,
          first_name: result.data.user.first_name,
          last_name: result.data.user.last_name,
          token: result.data.token.token,
          id: result.data.user.id,
          profilePicUrl: result.data.user.profilePicUrl,
        };
        setUser(user);
        axios.defaults.headers.common["Authorization"] =
          result.data.token.token;
        history.push("/");
      });
  };

  const handleFBLogin = (accessToken) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.post("/auth/facebook/token").then((result) => {
      const user = {
        email: result.data.user.email,
        first_name: result.data.user.first_name,
        last_name: result.data.user.last_name,
        token: `Bearer ${accessToken}`,
        id: result.data.user.id,
        profilePicUrl: result.data.user.profilePicUrl,
        facebookId: result.data.user.facebookId,
      };
      setUser(user);
      history.push("/");
    });
  };

  if (user) {
    history.push("/");
  }

  return (
    <Container maxWidth="xl" className={classes.logInContainer}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <LogInForm
              handleLogIn={handleLogIn}
              handleSignUp={handleSignUp}
              handleFBLogin={handleFBLogin}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
