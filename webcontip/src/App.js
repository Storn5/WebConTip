import React from 'react';
import './App.css';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import WatchedMoviesPage from "./components/WatchedMoviesPage";
import FilmPage from "./components/FilmPage";
import history from './components/history';
import IndexPage from "./components/IndexPage";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login/" component={LoginPage} />
        <Route path="/profile/" component={ProfilePage} />
        <Route path="/watched/" component={WatchedMoviesPage} />
        <Route exact path="/" component={IndexPage} />
        <Route path="/film/:id" component={FilmPage} />
      </Switch>
    </Router>
  );
}

export default App;
