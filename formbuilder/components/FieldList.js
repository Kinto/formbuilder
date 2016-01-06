import React, { Component } from "react";

export default class FieldList extends Component {
  addField(field, event) {
    event.preventDefault();
    this.props.addField(field);
  }

  render() {
    return (
      <ul> {
        this.props.fieldList.map((field, index) => {
          return (
            <li key={index}>
              <a href="#" onClick={this.addField.bind(this, field)}>
                {field.label}
              </a>
            </li>
          );
        })
      }</ul>
    );
  }
}
