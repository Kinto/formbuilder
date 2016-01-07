import React from "react";

export default function EditableField(props) {
  const handleDelete = function(name, event) {
    event.preventDefault();
    props.deleteField(name);
  };

  return (
    <div>
      <SchemaField {...props}/>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
