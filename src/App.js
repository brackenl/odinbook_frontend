import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import NavBar from "./components/NavBar/NavBar";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Friends from "./components/Friends/Friends";
import Account from "./components/Account/Account";

import "./App.css";

require("dotenv").config();

const App = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const history = useHistory();

  /* FOR PURPOSES OF PASSPORT TESTING
  if (!user) {
    history.push("/login");
  }
  */

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route path="/account">
          <Account user={user} setUser={setUser} />
        </Route>
        <Route path="/friends">
          <Friends user={user} />
        </Route>
        <Route path="/users/:userId">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/login">
          <LogIn user={user} setUser={setUser} />
        </Route>
        <Route path="/">
          <Dashboard user={user} setUser={setUser} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
