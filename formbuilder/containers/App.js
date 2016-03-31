import React from "react";

export default function App(props) {
  const {fieldList, content, notifications, header} = props;
  const contentClassName = fieldList? "col-sm-9" : "col-sm-9 center";
  return (
    <div>
      {header}
      <div className="container">
        <div className="row">
          {fieldList ? <div className="col-sm-3">{fieldList}</div> : <div/>}
          <div className={contentClassName}>
            {notifications}
            {content || <p>Nothing to render</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
