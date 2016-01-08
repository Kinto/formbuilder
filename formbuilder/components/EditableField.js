import React from "react";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

export default function EditableField(props) {
  const handleDelete = function(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this field?")) {
      props.removeField(props.name);
    }
  };

  if (props.schema.type === "object") {
    // This can only be the root form object, returning a regular SchemaField.
    return <SchemaField {...props}/>;
  }

  return (
    <div className="row editable-field">
      <div className="col-sm-10">
        <SchemaField {...props}/>
      </div>
      <div className="col-sm-2 editable-field-actions">
        <button onClick={handleDelete}>
          <i className="glyphicon glyphicon-remove-sign"/>
        </button>
      </div>
    </div>
  );
}

