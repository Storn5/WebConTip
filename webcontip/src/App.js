import React from 'react';
import './App.css';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import history from './components/history';


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/profile/" component={ProfilePage} />
        <Route path="/login/" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
