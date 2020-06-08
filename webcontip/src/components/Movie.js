/* eslint react/prop-types: 0 */

import React, { Component } from "react";
import RateButton from "./RateButton";

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_rating: "",
			tmdb: [],
			loaded_tmdb: false,
		};
	}

    handleRatingChange = event => {
        this.setState({
            movie_rating: event.target.value
        });
	}
	
	loadTMDB() {
		const access_token = localStorage.getItem('jwt access');
		const options = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
			}
		}
		fetch(`https://api.themoviedb.org/3/movie/${ this.props.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(tmdb => {
				console.log(tmdb);
				this.setState(() => {
					return {
						tmdb,
						loaded_tmdb: true
					};
				});
			});
	}

	render() {
		let overview = <span></span>

		if (!this.state.loaded_tmdb) {
			this.loadTMDB();
		} else {
			overview = this.state.tmdb.overview;

			return (
        <article id="film square" className="title-card">
          <div className="col-xs-4">
            <div className="watchlist-row">
              <a className="no-border-btm" href={ this.props.link }>
                <div className="title-poster no-radius-right">
                  <img width="300" height="450" className="title-poster-img" src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.props.title }/>
                </div>
              </a>
            </div>
          </div>
          <div className="col-xs-8 title-card-content">
            <h4 className="tm-gallery-title">
              <a className="no-border-btm" href={ this.props.link }>
                { this.props.title }
              </a>
            </h4>
            <p className="tm-gallery-description">
              { overview }
            </p>
            <div className="title-card-content-bottom">
              <div id="text-input-field" className="col-6 col-12-xsmall rating-input-field">
                <input type="text" className="form-control" name={`rating${ this.props.film_id }`} id={`rating${ this.props.film_id }`} value={ this.state.movie_rating } onChange={ this.handleRatingChange } placeholder="0-100 points" />
              </div>
              <RateButton film_id={ this.props.film_id } movie_rating={ this.state.movie_rating } className="rating-button" />
            </div>
          </div>
        </article>
			);
		}

		return null;
	}
}

export default Movie;
