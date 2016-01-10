import React from "react";

export default function FormOptionsMenu(props) {
  return (
    <div className="list-group">
      <button type="button" className="list-group-item"
        onClick={props.formEditOptions}>
        <i className="glyphicon glyphicon-wrench" />
        {" "}Edit Form properties
      </button>
      <button type="button" className="list-group-item">
        <i className="glyphicon glyphicon-fullscreen" />
        {" "}Show JSONSchema
      </button>
    </div>
  );
}
