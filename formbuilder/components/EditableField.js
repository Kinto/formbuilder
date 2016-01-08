import React, { Component } from "react";
import Form from "react-jsonschema-form";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";


export default class EditableField extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false, schema: props.schema};
  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({edit: true});
  }

  handleUpdate({formData}) {
    const schema = {...this.props.schema, ...formData};
    this.setState({edit: false, schema});
    // XXX handle rename
    this.props.updateField(this.props.name, schema, formData.required);
  }

  handleDelete(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this field?")) {
      this.props.removeField(this.props.name);
    }
  }

  render() {
    const props = this.props;
    if (props.schema.type === "object") {
      // This can only be the root form object, returning a regular SchemaField.
      return <SchemaField {...props}/>;
    }

    if (this.state.edit) {
      const formData = {
        ...props.schema,
        name: props.name,
        required: props.required,
      };
      return (
        <div>
          <Form
            schema={props.uiSchema.editSchema}
            formData={formData}
            onSubmit={this.handleUpdate.bind(this)} />
        </div>
      );
    }

    return (
      <div className="row editable-field">
        <div className="col-sm-10">
          <SchemaField {...props} schema={this.state.schema} />
        </div>
        <div className="col-sm-2 editable-field-actions">
          <button onClick={this.handleEdit.bind(this)}>
            <i className="glyphicon glyphicon-edit"/>
          </button>
          <button onClick={this.handleDelete.bind(this)}>
            <i className="glyphicon glyphicon-remove-sign"/>
          </button>
        </div>
      </div>
    );
  }
}

