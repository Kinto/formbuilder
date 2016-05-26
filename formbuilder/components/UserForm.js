import React, { Component } from "react";
import Form from "react-jsonschema-form";


export default class UserForm extends Component {
  componentDidMount() {
    // If the schema properties is empty, then try to load the schema from the
    if (Object.keys(this.props.schema.properties).length === 0) {
      this.props.loadSchema(this.props.params.id);
    }
  }

  render() {
    const onSubmit = ({formData}) => {
      this.props.submitRecord(formData, this.props.params.id, () => {
        this.props.history.pushState(null, "/form/data-sent");
      });
    };
    return (<div className="narrow">
      <Form schema={this.props.schema} uiSchema={this.props.uiSchema}
        onSubmit={onSubmit}/>
    </div>);
  }
}
