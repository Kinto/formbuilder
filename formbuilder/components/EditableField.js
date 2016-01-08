import React from "react";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

export default function EditableField(props) {
  const handleDelete = function(event) {
    event.preventDefault();
    // XXX: We need to find a way to access this action...
    props.removeField(props.name);
  };

  if (props.schema.type === "object") {
    return <SchemaField {...props}/>;
  }

  return (
    <div className="row editable-field">
      <div className="col-sm-6">
        <SchemaField {...props}/>
      </div>
      <div className="col-sm-6">
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
}
