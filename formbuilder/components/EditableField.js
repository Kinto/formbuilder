import React from "react";

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

export default function EditableField(props) {
  const handleDelete = function(event) {
    event.preventDefault();
    // XXX: We need to find a way to access this action...
    props.removeField(props.name);
  };

  return (
    <div className="editable-field">
      <SchemaField {...props}/>
      {props.schema.type !== "object" ?
        <button onClick={handleDelete}>delete</button> :
        null}
    </div>
  );
}
