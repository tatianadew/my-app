/* eslint-disable no-unused-vars */
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import Home from "../pages/home/Index";
  import Spotify from "../pages/spotify/Spotify"

  function AppRouter() {
  
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return (
      <Router>
        <Switch>
          <Route path="/create-playlist">
            {isLoggedIn ? (
              <Spotify />
            ) : (
              <Redirect exact from="/create-playlist" to="/" />
            )}
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
  
  export default AppRouter;