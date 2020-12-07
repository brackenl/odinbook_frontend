import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import UserAvatar from "../UserAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(32,33,34)",
    display: "flex",
    flexWrap: "wrap",
    // flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  friendName: {
    color: "white",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "rgb(32,33,34)",
    color: "white",
    margin: "20px 10px",
    width: "25%",
    [theme.breakpoints.down("md")]: {
      width: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  userDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
  acceptButton: { color: "green" },
  declineButton: {
    color: "red",
  },
}));

const FriendCard = ({ friend, handleAcceptRequest, handleDeclineRequest }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/users/${friend._id}`);
  };

  return (
    <Paper className={classes.paper}>
      <Card className={classes.root}>
        <UserAvatar user={friend} />
        <CardContent className={classes.userDetails} onClick={handleClick}>
          <Typography variant="body1" className={classes.friendName}>
            {friend.first_name} {friend.last_name}
          </Typography>
        </CardContent>
        <CardActions className={classes.buttonContainer}>
          <Button
            size="small"
            className={classes.acceptButton}
            onClick={() => handleAcceptRequest(friend._id)}
          >
            Accept
          </Button>
          <Button
            size="small"
            className={classes.declineButton}
            onClick={() => handleDeclineRequest(friend._id)}
          >
            Decline
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default FriendCard;
