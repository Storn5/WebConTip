/* eslint react/prop-types: 0 */

import React, { Component } from "react";
import SendButton from "./SendButton";

class RateButton extends Component {
	handleClick = (event) => {
		if (isNaN(this.props.movie_rating)) {
			event.preventDefault();
		}
		else if (+this.props.movie_rating > 100 || +this.props.movie_rating < 0) {
			event.preventDefault();
		}
		else {
			event.preventDefault();
			const access_token = localStorage.getItem('jwt access');
			let options = {
				method: "POST",
				body: JSON.stringify({ film: this.props.film_id, value: this.props.movie_rating }),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `JWT ${ access_token }`
				}
			}
			fetch('http://yyr3ll.pythonanywhere.com/api/v1/app/rating/create/', options)
				.then(res => {
					console.log(res);
					return res.json();
				});
		}
	}

	render() {
		return (
      <SendButton buttonName="Rate" onSubmit={ this.handleClick } className={ this.props.className } />
		);
	}
}

export default RateButton;
