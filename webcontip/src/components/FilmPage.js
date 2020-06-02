import React, { Component } from "react";

import Header from "./Header";
import SendButton from "./SendButton";

class FilmPage extends Component{
  constructor(props) {
      super(props);
      this.state = {
          data: [],
          tmdb: [],
          loaded: false,
          loaded_tmdb: false,
          placeholder: "Loading",
          watched_films: [],
          isInWatched: false,
      };
  }

  handleAddToWatched = (event) => {

      const access_token = localStorage.getItem('jwt access');
      const options = {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `JWT ${ access_token }`
          }
      }
      fetch(`http://localhost:8000/api/v1/app/watched/set/`, options)
          .then(response => {
              if (response.status > 400) {
                  //<Redirect to="/login" />
                  this.props.history.push("/login/");
                  return this.setState(() => {
                      return { placeholder: "Something went wrong!" };
                  });
              }

              return response.json();
          })
          .then(watched_films => {


              watched_films.watched_list.push(this.state.data.id);

              this.setState({ watched_films: watched_films.watched_list });

              console.log("Modified list (for DEBUG ) " + this.state.watched_films);
              
              const add_options = {
                  method: "PUT",
                  body: JSON.stringify({ "watched_list": watched_films.watched_list }),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `JWT ${access_token}`
                  }
              }


              fetch(`http://localhost:8000/api/v1/app/watched/set/`, add_options)
                  .then(response => {
                      console.log(response);
                      this.isInWatched();
                      return response.json();
                  })
          });

  }

  handleDeleteFromWatched = (event) => {

      const access_token = localStorage.getItem('jwt access');
      const options = {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `JWT ${ access_token }`
          }
      }
      fetch(`http://localhost:8000/api/v1/app/watched/set/`, options)
          .then(response => {
              if (response.status > 400) {
                  //<Redirect to="/login" />
                  this.props.history.push("/login/");
                  return this.setState(() => {
                      return { placeholder: "Something went wrong!" };
                  });
              }

              return response.json();
          })
          .then(watched_films => {
              const indexOfFilm = watched_films.watched_list.indexOf(this.state.data.id);

              if (~indexOfFilm) {
                  watched_films.watched_list.splice(indexOfFilm, 1);
              }

              this.setState({ watched_films: watched_films.watched_list });

              console.log("Modified list (for DEBUG ) " + this.state.watched_films);
              
              const add_options = {
                  method: "PUT",
                  body: JSON.stringify({ "watched_list": watched_films.watched_list }),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `JWT ${access_token}`
                  }
              }


              fetch(`http://localhost:8000/api/v1/app/watched/set/`, add_options)
                  .then(response => {
                      console.log(response);
                      this.isInWatched();
                      return response.json();
                  })
          });

  }

  isInWatched = () => {
      const access_token = localStorage.getItem('jwt access');
      const options = {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `JWT ${ access_token }`
          }
      }
      fetch(`http://localhost:8000/api/v1/app/watched/set/`, options)
          .then(response => {
              if (response.status > 400) {
                  //<Redirect to="/login" />
                  this.props.history.push("/login/");
                  return this.setState(() => {
                      return { placeholder: "Something went wrong!" };
                  });
              }

              return response.json();
          })
          .then(watched_films => {
              let isInWatched = Boolean(watched_films.watched_list.find(filmID => {
                  return filmID == this.state.data.id;
              }));

              this.setState({
                  isInWatched,
              });
          });
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
      fetch(`http://localhost:8000/api/v1/app/film/detail/${ this.props.match.params.id }`, options)
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
              this.isInWatched();
              this.setState(() => {
                  return {
                      data,
                      loaded: true
                  };
              });
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
      fetch(`https://api.themoviedb.org/3/movie/${ this.state.data.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options)
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
      let movie = <h1>Film page</h1>

      if (this.state && this.state.loaded && this.state.loaded_tmdb) {
          let counter = 0;
          let genresArray = this.state.data.genre;

          let genres = genresArray.map(genre => {
              counter += 1;
              if (counter === genresArray.length) {
                  return(
                      <span>
                          { genre.name }
                      </span>
                  );
              } else {
                  return(
                      <span>
                          { genre.name }
                          <span>, </span>
                      </span>
                  );
              }
          });

          let buttonName = "Add to watched";
          let buttonHandler = this.handleAddToWatched;

          if (this.state.isInWatched) {
              buttonName = "Remove from watched";
              buttonHandler = this.handleDeleteFromWatched;
          }

          movie = (
            <div className="tm-section">
              <div className="col-sm-4 col-sm-pull-8">
                <div className="title-sidebar">
                  <aside>
                    <div className="title-poster no-radius-btm">
                      <img width="300" height="450" src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.state.data.title } />
                    </div>
                  </aside>
                </div>
                <div className="title-sidebar-button no-radius-top">
                  <SendButton buttonName={ buttonName } onSubmit={ buttonHandler } />
                </div>
              </div>
              <h3 className="tm-movie-title">{ this.state.data.title }</h3>
              <h4 className="tm-gallery-title">Description</h4>
              <p className="tm-gallery-description">{ this.state.tmdb.overview }</p>
              <h4 className="tm-gallery-title">Rating</h4>
              <a className="no-border-btm" href={ `https://www.themoviedb.org/movie/${ this.state.data.tmdb }` }>
                <p className="tm-gallery-price">{ this.state.tmdb.vote_average }</p>
              </a>
              <h4 className="tm-gallery-title">Release date</h4>
              <p className="tm-gallery-description">{ this.state.tmdb.release_date }</p>
              <h4 className="tm-gallery-title">Runtime</h4>
              <p className="tm-gallery-description">{ `${ this.state.tmdb.runtime } minutes` }</p>
            </div>
          );
            {/*
              <div className="info-box">
                  <div className="info-box-container clearfix">
                      <div className="col-sm-8 col-sm-push-4">
                          <div className="title-block">
                              <h1>
                                  { this.state.data.title }
                              </h1>
                          </div>
                          <div className="detail-infos">
                              <hr />
                                  <div className="detail-infos-detail">
                                      <div className="clearfix">
                                          <div className="detail-infos-subheading label">
                                              Rating
                                          </div>
                                          <div className="detail-infos-detail-values">
                                              <div className="title-card-rating">
                                                  <a className="no-border-btm" href={ `https://www.themoviedb.org/movie/${ this.state.data.tmdb }` }>
                                                      <img src={ tmdb_logo } alt="tmdb logo" />
                                                      <span>{ this.state.tmdb.vote_average }</span>
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="clearfix">
                                          <div className="detail-infos-subheading label">
                                              Genres
                                          </div>
                                          <div className="detail-infos-detail-values">
                                              { genres }
                                          </div>
                                      </div>
                                      <div className="clearfix">
                                          <div className="detail-infos-subheading label">
                                              Release date
                                          </div>
                                          <div className="detail-infos-detail-values">
                                              <span>{ this.state.tmdb.release_date }</span>
                                          </div>
                                      </div>
                                      <div className="clearfix">
                                          <div className="detail-infos-subheading label">
                                              Runtime
                                          </div>
                                          <div className="detail-infos-detail-values">
                                              <span>{ `${ this.state.tmdb.runtime } minutes` }</span>
                                          </div>
                                      </div>     
                                  </div>
                              <hr />
                              <div>
                                  <p className="detail-infos-subheading">Synopsis</p>
                                  <p className="text-wrap-pre-line">
                                      <span>
                                          { this.state.tmdb.overview }
                                      </span>
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="col-sm-4 col-sm-pull-8">
                          <div className="title-sidebar">
                              <aside>
                                  <div className="title-poster no-radius-btm">
                                      <img src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.state.data.title } />
                                  </div>
                              </aside>
                          </div>
                          <div className="title-sidebar-button no-radius-top">
                              <SendButton buttonName={ buttonName } onSubmit={ buttonHandler } />
                          </div>
                      </div>
                  </div> */}

                  {/* <h1 id="main-film-title">{ this.state.data.title }</h1>
                  <span id="main-film-image" className="image left"><img src={ "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.state.tmdb.poster_path } alt={ this.state.data.title } /></span>
                  <h3>Film description:</h3>
                  <p id="film-description">{ this.state.tmdb.overview }</p>
                  <h3>Genres: </h3>
                  <p>
                      { this.state.data.genre.map(genre => { return(genre.name + "  ") }) }
                  </p>
                  <h3>Release Date: </h3>
                  <p>{ this.state.tmdb.release_date }</p>
                  <h3>Runtime: </h3>
                  <p>{ this.state.tmdb.runtime } minutes</p>
                  <h3><a href={`https://www.imdb.com/title/tt0${ this.state.data.imdb }`}>IMDB Link</a></h3>
                  <SendButton buttonName="Add to watched" onSubmit={ this.handleAddToWatched } /> */}
      }

      if (this.state.loaded && !this.state.loaded_tmdb) {
          this.loadTMDB();
      }

      return(
        <div className="container">
          <Header />
          <main>
            <header className="row tm-welcome-section">
              <h2 className="col-12 text-center tm-section-title">Movie Details</h2>
              <p className="col-12 text-center">...where you can find a detailed description of a particular film.</p>
            </header>
            {movie}
          </main>
        </div>
      )
  }
}

export default FilmPage;