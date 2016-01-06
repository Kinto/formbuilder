import React, { Component } from "react";

export default class FieldList extends Component {
  render() {
    return <ul> {
      this.props.fieldList.map(field => {
        return (
          <li>
            <a href="#" onClick={this.props.addField.bind(this, field)}>
              {field.label}
            </a>
          </li>);
      })
    }
    </ul>;
  }
}
