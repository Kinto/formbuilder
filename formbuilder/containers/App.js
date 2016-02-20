import React from "react";


export default function App(props) {
  const {fieldList, content, notifications, displayTitle} = props;
  console.log("title", displayTitle);
  const contentClassName = fieldList? "col-sm-8" : null;
  return (
    <div className="container">
    {displayTitle ? <div className="page-header"><h1>FormBuilder</h1></div> : null}
      <div className="row">
        {fieldList ? <div className="col-sm-4">{{fieldList}}</div> : null}
        <div className={contentClassName}>
          {notifications}
          {content || <p>Nothing to render</p>}
        </div>
      </div>
    </div>
  );
}
