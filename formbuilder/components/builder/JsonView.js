import React from "react";


export default function JSONView(props) {
  return (
    <div>
      <h3>JSONSchema</h3>
      <div className="form-group">
        <textarea
          className="form-control"
          readOnly=""
          rows="20"
          style={{fontFamily: "monospace"}}
          value={JSON.stringify(props.schema, null, 2)}
          onChange={() => {}} />
      </div>
    </div>
  );
}
