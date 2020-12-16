import React from "react";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

const Facebook = ({ handleFBLogin }) => {
  const componentClicked = () => {};

  const responseFacebook = (res) => {
    handleFBLogin(res.accessToken);
  };

  return (
    <div style={{ width: "100%", margin: "0 8px 8px 8px" }}>
      <FacebookLogin
        appId="453747755614035"
        // autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            variant="contained"
            color="secondary"
            style={{ width: "100%" }}
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
