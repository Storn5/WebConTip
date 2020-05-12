import React, { Component } from "react";
import PropTypes from 'prop-types';

import Header from "./Header";
import ProfileForm from "./ProfileForm";

class ProfilePage extends Component{
  static get propTypes() {
    return {
      history: PropTypes.any,
    };
  }
  render() {
    return (
			<div id="wrapper" className="container">
				<Header />
				<ProfileForm history={this.props.history}/>
        <br /><br /><br />
			</div>
    )
  }
}


export default ProfilePage;