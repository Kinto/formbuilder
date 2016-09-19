import React, { Component } from "react";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

import {Dropdown, MenuItem}  from "react-bootstrap"

import config from "../../config";

export default class AddFieldDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {"fieldList": config.fieldList};
  }

  handleAddField(field_index, event) {
    field_index = parseInt(field_index);
    const field = this.state.fieldList[field_index];
    this.props.addField(field);
  }

  render () {
    return (
      <Dropdown title="Add a field" dropup id="split-button-dropup">
        <Dropdown.Toggle>
          <i className="glyphicon glyphicon-plus" />
          Add a field
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {this.state.fieldList.map((field, index) => {
            return <MenuItem key={index}
                eventKey={index}
                onSelect={this.handleAddField.bind(this)}
                ><i className={`glyphicon glyphicon-${field.icon}`} />
                {field.label}
              </MenuItem>
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
