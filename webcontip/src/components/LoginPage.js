import React, { Component } from "react";
import PropTypes from 'prop-types';

import LoginForm from "./LoginForm";
import Header from "./Header";

class LoginPage extends Component{
  static get propTypes() {
    return {
      history: PropTypes.any,
    };
  }
  render() {
    return (
      <div id="wrapper" className="container">
        <Header history={this.props.history} />
        <LoginForm history={this.props.history} />
        <br /><br /><br />
      </div>
    )
  }
}


export default LoginPage;