import React, { Component } from "react";

class WelcomeText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			placeholder: "Loading"
		};
	}

	componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
            }
        }
		fetch("http://localhost:8000/api/v1/account/users/me/", options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState(() => {
					return {
						data,
						loaded: true
					};
				});
			});
	}

	render() {
		return (
			<div>
				<h2>Welcome, {this.state.data.username}!</h2>
				<p>Email: {this.state.data.email}</p>
			</div>
		);
	}
}

export default WelcomeText;
