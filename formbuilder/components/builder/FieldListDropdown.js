import React, { Component } from "react";

import {Dropdown, MenuItem}  from "react-bootstrap";

import config from "../../config";

export default class FieldListDropdown extends Component {
  constructor(props) {
    super(props);

    let fieldListAction = "add_field";
    if (typeof(this.props.name) !== "undefined") {
      // By default FieldListDropdown adds a new field, but in this case
      // we want to switch from a field to a other one (ex: "input" to
      // "checkbox").
      fieldListAction = "switch_field";
    }
    this.state = {
      fieldList: config.fieldList,
      fieldListAction: fieldListAction
    };
  }

  handleFieldListAction(fieldIndex, event) {
    const fieldList = this.state.fieldList;
    fieldIndex = parseInt(fieldIndex, 10);

    if (typeof fieldList[fieldIndex] !== "undefined") {
      const field = fieldList[fieldIndex];

      if (this.state.fieldListAction === "switch_field") {
        this.props.switchField(this.props.name, field);
      } else {
        this.props.addField(field);
      }

    }
  }

  render () {
    return (
      <Dropdown dropup={this.state.fieldListAction === "add_field"} id="split-button-dropup" className={this.props.className}>
        <Dropdown.Toggle bsStyle={this.props.bsStyle}>
          {this.props.children}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.state.fieldList.map((field, index) => {
            return <MenuItem key={index}
                eventKey={index}
                onSelect={this.handleFieldListAction.bind(this)}
                ><i className={`glyphicon glyphicon-${field.icon}`} />
                {field.label}
              </MenuItem>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

FieldListDropdown.defaultProps = {
  bsStyle: "default"
};
