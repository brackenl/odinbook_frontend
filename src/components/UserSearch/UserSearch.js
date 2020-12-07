import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Typography from "@material-ui/core/Typography";

import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 30,
  },
  inputRoot: {
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
}));

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    axios.get("/users").then((result) => {
      setUsers(result.data.users);
    });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const nameArr = event.target.value.split(" ");
      const firstTerm = nameArr[0];
      const secondTerm = nameArr[1];

      axios.post("/users/search", { firstTerm, secondTerm }).then((result) => {
        if (result.data.user) {
          history.push(`/users/${result.data.user._id}`);
        } else {
          setError(result.data.error);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      });
    }
  };

  if (!users) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div style={{ width: "90%" }} className={classes.root}>
      {error && (
        <div>
          <Typography variant="body1" className={classes.errorText}>
            {error}
          </Typography>
        </div>
      )}
      <Autocomplete
        id="userSearch"
        // freeSolo
        options={users.map((user) => `${user.first_name} ${user.last_name}`)}
        classes={{ inputRoot: classes.inputRoot }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            label="User search"
            margin="normal"
            variant="outlined"
            onKeyPress={handleKeyPress}
          />
        )}
      />
    </div>
  );
};

export default UserSearch;
