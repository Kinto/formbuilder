import React from "react";


export default function FormOptions(props) {
  return (
    <div>
      <h3>JSONSchema</h3>
      <textarea
        className="form-control json-viewer"
        readOnly=""
        value={JSON.stringify(props.schema, null, 2)}
        onChange={() => {}} />
    </div>
  );
}
