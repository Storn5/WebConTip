import React, { Component } from "react";
import history from './history';



class Header extends Component{
  render() {
    return (
      <div className="tm-header">
				<div className="row-reverse tm-header-inner">
					<div className="col-md-6 col-12">
						<div className="tm-site-text-box">
							<h1 className="tm-site-title">ConTip</h1>
							<h6 className="tm-site-description">Content recommender for optimal free time experience</h6>	
						</div>
					</div>
					<nav className="col-md-6 col-12 tm-nav">
						<ul className="tm-nav-ul">
							<li className="tm-nav-li"><a href="/" className="tm-nav-link">Home</a></li>
							<li className="tm-nav-li"><a href="/profile/" className="tm-nav-link">Profile</a></li>
							<li className="tm-nav-li"><a href="/search/" className="tm-nav-link">Search</a></li>
							<li className="tm-nav-li"><a href="/watched/" className="tm-nav-link">Watched</a></li>
							<li className="tm-nav-li"><a href="/login/" className="tm-nav-link">Login</a></li>
						</ul>
					</nav>
				</div>
			</div>
    );
  }
}


export default Header;