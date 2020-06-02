import React, { Component } from "react";
import MovieList from "./MovieList";
import Header from "./Header";

class IndexPage extends Component {
    render() {
        return (
            <div className="container">
                <Header />
                <main>
                    <header className="row tm-welcome-section">
                        <h2 className="col-12 text-center tm-section-title">Specially For You...</h2>
                        <p className="col-12 text-center">...we sat down and watched thousands of movies, just to find some special ones that you should definitely check out this week.</p>
                    </header>
                    <div className="row tm-gallery">
                        <MovieList history={ this.props.history } key="movieList"/>
                    </div>
                </main>
            </div>
        );
    }
}

export default IndexPage;
