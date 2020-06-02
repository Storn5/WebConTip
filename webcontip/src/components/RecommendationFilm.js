import React, { Component } from "react";

class RecommendationFilm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tmdb: [],
            loaded_tmdb: false,
        };
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    loadTMDB() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`,
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
        let image = <img src="" alt="" />

        if (this.state.loaded_tmdb) {
            image = <img src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.props.title } className="img-fluid tm-gallery-img" />
        }

        if (!this.state.loaded_tmdb) {
            this.loadTMDB();
        }

        return(
            <article className="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
              <figure>
								<a href={ this.props.href }>{ image }</a>
								<figcaption>
									<h4 className="tm-gallery-title">{ this.props.title }</h4>
									<p> Genre: {this.props.genre} </p>
								</figcaption>
							</figure>
            </article>
            /*
              <span className="image">
                    { image }
                </span>
                <a href={ this.props.href }>
                    <h2>{ this.props.title }</h2>
                    <div className="content">
                        <p>Genre: { this.props.genre }</p>
                    </div>
                </a>
            */
        );
    }
}
export default RecommendationFilm;
