import React from "react";
import Header from "../components/Header";

export default function App(props) {
  const {fieldList, content, notifications, displayTitle} = props;
  const contentClassName = fieldList? "col-sm-9" : null;
  return (
    <div>
      {displayTitle ? <Header /> : null}
      <div className="container">
        <div className="row">
          {fieldList ? <div className="col-sm-3">{fieldList}</div> : null}
          <div className={contentClassName}>
            {notifications}
            {content || <p>Nothing to render</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
