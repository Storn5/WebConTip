import React, { Component } from "react";



class SignUpForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      re_password: '',
    }
  }
  handleUsernameChange = event => {
    this.setState({
      username: event.target.value
    })
  }
  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    })
  }
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }
  handleConfirmPasswordChange = event => {
    this.setState({
      re_password: event.target.value
    })
  }
  handleBirthDateChange = event => {
    this.setState({
      birthDate: event.target.value
    })
  }
  handleSubmit = event => {
    if (this.state.password == this.state.re_password) {
      alert('Success! Authenticate me!');
      event.preventDefault();
      let options = {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch('http://localhost:8000/api/v1/account/users/', options)
        .then(res => {
          if (res.status != 201){
            alert("Something went wrong");
          }
          return res.json();
        });
    }
    else {
      alert('Error: Passwords do not match.');
      event.preventDefault();
    }
  }
  render() {
    return (
      <div>
        <h2><br /><br /><br />No Account? Create One!<br /><br /></h2>
					<form  onSubmit={this.handleSubmit} method="POST">
						<input type="text" value={this.state.username} onChange={this.handleUsernameChange} name="text" className="form-control" placeholder="Username" />
						<input type="email" value={this.state.email} onChange={this.handleEmailChange} name="email" className="form-control" placeholder="Email" />
						<input type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" className="form-control" placeholder="Password" />
						<input type="password" value={this.state.re_password} onChange={this.handleConfirmPasswordChange} name="re-password" className="form-control" placeholder="Confirm Password" />
						<button type="submit" className="tm-btn">Sign Up</button>
					</form>
      </div>
    );
  }
}


export default SignUpForm;