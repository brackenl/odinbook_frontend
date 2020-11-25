import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

require("dotenv").config();

const App = () => {
  const [user, setUser] = useState("");
  const history = useHistory();

  useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("user"));
    setUser(lsUser);

    if (!lsUser) {
      history.push("/login");
    }
  }, [history]);

  // const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  // const user = JSON.parse(localStorage.getItem("user"));
  // if (!user) {
  //   history.push("/login");
  // }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Route path="/">
          <Dashboard user={user} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
