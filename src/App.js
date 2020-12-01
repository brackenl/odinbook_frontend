import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import NavBar from "./components/NavBar/NavBar";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";

import "./App.css";

require("dotenv").config();

const App = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const history = useHistory();

  if (!user) {
    history.push("/login");
  }

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/users/:userId">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/login" exact>
          <LogIn user={user} setUser={setUser} />
        </Route>
        <Route path="/">
          <Dashboard user={user} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
