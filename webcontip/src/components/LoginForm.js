import React, { Component } from "react";
import PropTypes from 'prop-types';

import SignUpForm from "./SignUpForm";

class LoginForm extends Component{
  static get propTypes() {
    return {
      history: PropTypes.any,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let options = {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:8000/api/v1/auth/login/', options)
      .then(res => {
        if (res.status != 200){
          alert("Wrong credentials!");
          return false;
        }
        alert("Success! Logged in!");
        return res.json();
      })
      .then(data => {
        if(data){
          localStorage.setItem('jwt access', data.access);
          localStorage.setItem('jwt refresh', data.refresh);
          this.props.history.push("/profile/");
        }
      });
  }

  render() {
    return (
      <main>
        <header className="row tm-welcome-section">
          <h2 className="col-12 text-center tm-section-title">Log In</h2>
        </header>

        <div className="tm-section">
          <form id="input-auth-form" onSubmit={this.handleSubmit} method="POST">
            <input id="input-auth-username" type="text" value={this.state.username} onChange={this.handleUsernameChange} name="text" className="form-control" placeholder="Username" />
            <input id="input-auth-password" type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" className="form-control" placeholder="Password" />
            <button id="input-auth-button" type="submit" className="tm-btn">Log In</button>
          </form>
          <SignUpForm history={this.props.history} />
        </div>
      </main>
    );
  }
}

// LoginForm.defaultProps = {
//   handleSubmit: LoginForm.handleSubmit,
// };

export default LoginForm;