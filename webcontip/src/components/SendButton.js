/* eslint react/prop-types: 0 */

import React from "react";

const SendButton = (props) => {
	return (
    <Button id={ props.id } className={ props.className ? props.className : "" } buttonName={ props.buttonName } onSubmit={ props.onSubmit } />
	);
}

const Button = (props) => {
    const onClick = (event) => {
        props.onSubmit(event);
    };

	if (props.id === "DeleteProfileButton") {
		return (
			<div className="col-6 col-12-medium">
				<ul className="actions stacked">
					<li id={ props.id }><a href="#" className="button small fit" onClick={ onClick } >{ props.buttonName }</a></li>
				</ul>
			</div>
		);
	} else {
		return (
			<button type="submit" value="Submit" className="tm-btn" onClick={ onClick } >{ props.buttonName }</button>
		);
	}
}

export default SendButton;
