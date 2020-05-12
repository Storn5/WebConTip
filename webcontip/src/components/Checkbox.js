import React, { Component } from "react";
import PropTypes from 'prop-types';

class Checkbox extends Component {
  static get propTypes() {
    return {
      id: PropTypes.any,
      onCheckboxChange: PropTypes.any,
      name: PropTypes.any,
      isSelected: PropTypes.any,
      text: PropTypes.any
    };
  }
  render() {
    return(
      <div style={{ display: "inline-block" }}>
        <input
          id={ this.props.id }
          type="checkbox"
          name={ this.props.name }
          checked={ this.props.isSelected }
          onChange={ this.props.onCheckboxChange } />
        <label htmlFor={ this.props.id }>{ this.props.text }</label>
      </div>
    );
  }
}

export default Checkbox;