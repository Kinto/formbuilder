import React from "react";
import { Droppable } from "react-drag-and-drop";

import Default from "./Default";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

export default function Form(props) {
  const {error, schema, dragndropStatus} = props;
  const {properties} = schema;

  const onClick = (event) => {
    props.publishForm(({collection, adminToken}) => {
      props.history.pushState(null, `/builder/published/${adminToken}`);
    });
  };

  const onDrop = ({field}) => props.addField(JSON.parse(field));
  const registry = {
    ...SchemaField.defaultProps.registry,
    fields: {
      ...SchemaField.defaultProps.registry.fields,
      SchemaField: props.SchemaField,
      TitleField: props.TitleField,
      DescriptionField: props.DescriptionField,
    }
  };

  let saveButtonValue = "Save your form";
  if (props.status == "pending") {
    saveButtonValue = <div>{saveButtonValue} <i className="spin glyphicon glyphicon-refresh" /></div>;
  }
  const button = (
    <div className="pull-right">
      <button onClick={onClick} className="btn btn-success align-right">
        {saveButtonValue}
      </button>
    </div>);

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : <div/>}
      <div className="rjsf">
        <SchemaField {...props} registry={registry} />
      </div>
      {Object.keys(properties).length === 0 ? <Default /> : <div/>}
      <div className={dragndropStatus ? "dropzone-active" : null} >
        <Droppable id="dropzone" types={["field"]} className="form-area" onDrop={onDrop}>
        {dragndropStatus ? <p>Drop your widget here</p> : null}
        </Droppable>
      </div>
      {Object.keys(properties).length === 0 ? <div/> : button}
    </div>
  );
}
