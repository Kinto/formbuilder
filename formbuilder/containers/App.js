import React from "react";


export default function App(props) {
  const {fieldList, content, notifications} = props;
  return (
    <div className="container">
      <div className="page-header">
        <h1>FormBuilder</h1>
      </div>
      <div className="row">
        <div className="col-sm-4">
          {fieldList}
        </div>
        <div className="col-sm-8">
          {notifications}
          {content || <p>Nothing to render</p>}
        </div>
      </div>
    </div>
  );
}
