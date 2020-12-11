import React, { useState } from "react";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

const Facebook = ({ handleFBLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");

  const componentClicked = () => {
    console.log("clicked");
  };

  const responseFacebook = (res) => {
    console.log(res);
    console.log(res.userID, res.name, res.email, res.picture.data.url);
    // setIsLoggedIn(true);
    // setUserID(res.userID);
    // setName(res.name);
    // setEmail(res.email);
    // setPicture(res.picture.data.url);
    handleFBLogin(res.accessToken);
  };

  return (
    <div>
      <FacebookLogin
        appId={process.env.FACEBOOK_APP_ID}
        // autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<FacebookIcon />}
          >
            Log in with Facebook
          </Button>
        )}
      />
    </div>
  );
};

export default Facebook;
