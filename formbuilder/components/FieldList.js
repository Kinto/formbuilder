import React, { Component } from "react";

export default class FieldList extends Component {
  addField(field, event) {
    event.preventDefault();
    this.props.addField(field);
  }

  render() {
    return (
      <div className="list-group"> {
        this.props.fieldList.map((field, index) => {
          return (
            <button key={index} type="button" className="list-group-item"
              onClick={this.addField.bind(this, field)}>
              <i className={`glyphicon glyphicon-${field.icon}`} />
              {" " + field.label}
            </button>
          );
        })
      }</div>
    );
  }
}
