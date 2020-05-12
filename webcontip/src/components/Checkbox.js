import React from "react";

const Checkbox = ({ id, name, text, isSelected, onCheckboxChange }) => (
	<div style={{ display: "inline-block" }}>
		<input
			id={ id }
			type="checkbox"
			name={ name }
			checked={ isSelected }
			onChange={ onCheckboxChange } />
		<label htmlFor={ id }>{ text }</label>
	</div>
);

export default Checkbox;