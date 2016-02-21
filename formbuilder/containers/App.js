import React from "react";


export default function App(props) {
  const {fieldList, content, notifications, displayTitle} = props;
  const contentClassName = fieldList? "col-sm-9" : null;
  return (
    <div className="container">
    {displayTitle ? <div className="page-header"><h1>FormBuilder</h1></div> : null}
      <div className="row">
        {fieldList ? <div className="col-sm-3">{fieldList}</div> : null}
        <div className={contentClassName}>
          {notifications}
          {content || <p>Nothing to render</p>}
        </div>
      </div>
    </div>
  );
}
