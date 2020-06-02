import React, { Component } from "react";
import Header from "./Header";
import WatchedMoviesList from "./WatchedMoviesList";


class WatchedMoviesPage extends Component {
    render() {
        return (
          <div className="container">
            <Header />
            <WatchedMoviesList history={this.props.history} />
          </div>
        );
    }
}

export default WatchedMoviesPage;