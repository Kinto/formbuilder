import React from "react";
import { Droppable } from "react-drag-and-drop";

import Default from "./Default";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

import EditableField from "./EditableField";

export default function EditableForm(props) {
  const {error, schema} = props;
  const {properties} = schema;

  const onClick = (event) => {
    props.publishForm((collectionID) => {
      props.history.pushState(null, `/builder/published/${collectionID}`);
    });
  };

  const onDrop = ({field}) => props.addField(JSON.parse(field));

  const registry = {
    ...SchemaField.defaultProps.registry,
    fields: {
      ...SchemaField.defaultProps.registry.fields,
      SchemaField: EditableField,
    }
  };

  const button = (
    <div className="pull-right">
      <button onClick={onClick} className="btn btn-success align-right">
        Create form
      </button>
    </div>);

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : <div/>}
      <div className="rjsf">
        <SchemaField {...props} registry={registry} />
      </div>
      <Droppable types={["field"]} className="form-area" onDrop={onDrop}>
        {Object.keys(properties).length === 0 ?
          <Default /> : <div/>}
      </Droppable>
      {Object.keys(properties).length === 0 ? <div/> : button}
    </div>
  );
}
