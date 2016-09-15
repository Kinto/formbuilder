import React, { Component } from "react";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

import ButtonDropdown from "react-bootstrap-dropdown"

import config from "../../config";


export default class AddFieldDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {'fieldList': config.fieldList};
  }

  handleAddField(selected) {
    const field_index = parseInt(selected.value);
    const field = this.state.fieldList[field_index];

    this.props.addField(field);
  }

  render () {
    var dropdownItems = this.state.fieldList.map((field, index) => {
      return {
        "value": `${index}`,
        "disabled": false,
        "isDivider": false,
        "text": field.label
      };
    });

    return (
      <div className="btn-group">
        <ButtonDropdown updateTitle={false} title="Add a field&nbsp;" items={dropdownItems} onSelect={this.handleAddField.bind(this)} className="pull-right">
        </ButtonDropdown>
      </div>
    );
  }
}
