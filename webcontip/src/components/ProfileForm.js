import React, { Component } from "react";

import WelcomeText from "./WelcomeText";
import Checkbox from "./Checkbox";

let GENRES = [];

class ProfileForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      deletePassword: '',
      data: [],
      loaded: false,
      placeholder: "Loading",

      preferences: GENRES.reduce(
        (options, option) => ({
          ...options,
          [option]: false,
        }),
        {}
      ),
    };
  }

  handlePreferenceChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      preferences: {
      ...prevState.preferences,
      [name]: !prevState.preferences[name],
      },
    }));
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
      confirmPassword: event.target.value
    })
  }

  handleCurrentPasswordChange = event => {
    this.setState({
      currentPassword: event.target.value
    })
  }

  handleDeletePasswordChange = event => {
    this.setState({
      deletePassword: event.target.value
    })
  }

  handlePreferenceSubmit = (preferenceSubmitEvent, addToast) => {
    preferenceSubmitEvent.preventDefault();

    const selectedPreferences = (Object
      .keys(this.state.preferences)
      .filter(option => this.state.preferences[option])
    );

    console.log(`selectedPreferences: ${selectedPreferences}`);

    // Update user genres
    const access_token = localStorage.getItem('jwt access');
    let options = {
      method: "PUT",
      body: JSON.stringify({ genre_preference: selectedPreferences }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    'Authorization': `JWT ${ access_token }`
      }
    }
    fetch('http://localhost:8000/api/v1/app/preferences/set/', options)
      .then(res => {
        console.log(res);
        if (res.status != 200){
          addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });

        }
        else {
          this.props.history.push("/profile/");
          addToast("Preferences changed successfully!", { appearance: 'success', autoDismiss: true, });
        }
        return res.json();
      });
  }

  handleLogOutSubmit = event => {
    event.preventDefault();
    localStorage.removeItem('jwt access');
    localStorage.removeItem('jwt refresh')
    this.props.history.push("/login/");
  }

  handleEmailSubmit = (event, addToast) => {
    event.preventDefault();
    // Update user email
  const access_token = localStorage.getItem('jwt access');
    let options = {
      method: "PATCH",
      body: JSON.stringify({ email: this.state.email }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    'Authorization': `JWT ${ access_token }`
      }
    }
    fetch('http://localhost:8000/api/v1/account/users/me/', options)
      .then(res => {
        console.log(res);
        if (res.status != 200){
          addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
        }
        else {
          this.props.history.push("/profile/");
          addToast("Email changed successfully!", { appearance: 'success', autoDismiss: true, });
        }
        return res.json();
      });
  }

  handlePasswordSubmit = (event, addToast) => {
    if (this.state.password == this.state.confirmPassword) {
      event.preventDefault();
      // Update user password
      const access_token = localStorage.getItem('jwt access');
      let options = {
        method: "POST",
        body: JSON.stringify({ new_password: this.state.password, re_new_password: this.state.confirmPassword, current_password: this.state.currentPassword }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${ access_token }`
        }
      }
      fetch('http://localhost:8000/api/v1/account/users/set_password/', options)
        .then(res => {
          console.log(res);
          if (res.status != 204){
            addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
          }
          else {
            this.props.history.push("/login/");
          }
          return res.json();
        });
    }
    else {
      event.preventDefault();
      addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true, });
    }
  }

  handleDeleteProfile = (event, addToast) => {
    addToast("Profile deletion request submitted!", { appearance: 'info', autoDismiss: true, });
    // Delete user
    const access_token = localStorage.getItem('jwt access');
    let options = {
      method: "DELETE",
      body: JSON.stringify({ current_password: this.state.deletePassword }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${ access_token }`
      }
    }
    fetch('http://localhost:8000/api/v1/account/users/me/', options)
      .then(res => {
        console.log(res);
        if (res.status != 204){
          addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
        }
        else {
          this.props.history.push("/signup/");
        }
        return res.json();
      });
  }

  componentDidMount() {
  const access_token = localStorage.getItem('jwt access');
    const options = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `JWT ${ access_token }`
      }
    }

    fetch("http://localhost:8000/api/v1/app/genre/list/", options)
      .then(response => {
        console.log(response);
        if (response.status > 400) {
          this.props.history.push("/login");
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        GENRES = Array.from(data.map(genre => genre.id));

        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
    fetch("http://localhost:8000/api/v1/app/preferences/set/", options)
      .then(response => {
        console.log(response);
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(preferences => {
        preferences = preferences.genre_preference;
        
        preferences.forEach(preference => {
          this.setState(prevState => ({
            preferences: {
            ...prevState.preferences,
            [preference]: !prevState.preferences[preference],
            },
          }));
        });
      });
  }
  render() {
    return (
      <main>
				<header className="row tm-welcome-section">
					<h2 className="col-12 text-center tm-section-title">My Profile</h2>
					<p className="col-12 text-center">...where you can find or change info about your account.</p>
				</header>

				<div className="tm-section">
					<WelcomeText />
					<h2>Change Profile<br /><br /></h2>
					<h3>Change Favorite Genres<br /><br /></h3>
					<form onSubmit={this.handlePreferenceSubmit} method="POST">
            {this.state.data.map(genre => {
              let genreName = "genre" + genre.id;
                return (
                  <Checkbox
                    id={ genreName }
                    name={ genre.id }
                    text={ genre.name }
                    isSelected={ this.state.preferences[genre.id] }
                    onCheckboxChange={ this.handlePreferenceChange.bind(this) } />
                );
            })}
						<button type="submit" className="tm-btn">Change</button>
					</form>
					<h3>Change Email<br /><br /></h3>
					<form onSubmit={this.handleEmailSubmit} method="POST">
						<input type="email" value={this.state.email} onChange={this.handleEmailChange} name="email" className="form-control" placeholder="New Email" />
						<button type="submit" className="tm-btn">Change</button>
					</form>
					<h3>Change Password<br /><br /></h3>
					<form onSubmit={this.handlePasswordSubmit} method="POST">
						<input type="password" value={this.state.password} onChange={this.handlePasswordChange} name="password" className="form-control" placeholder="New Password" />
						<input type="password" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} name="re_password" className="form-control" placeholder="New New Password" />
						<button type="submit" className="tm-btn">Change</button>
					</form>
					<h3>Delete Account<br /><br /></h3>
					<form onSubmit={this.handleDeleteProfile} method="POST">
            <input type="password" value={this.state.deletePassword} onChange={this.handleDeletePasswordChange} name="del_password" className="form-control" placeholder="New Password" />
						<button type="submit" className="tm-btn">Delete Account</button>
					</form>
          <h3>Log Out<br /><br /></h3>
          <form onSubmit={this.handleLogOutSubmit}>
            <button type="submit" className="tm-btn">Log Out</button>
          </form>
				</div>
			</main>
    )
  }
}

export default ProfileForm;