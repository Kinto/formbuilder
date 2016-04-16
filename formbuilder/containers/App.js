import React from "react";

export default function App(props) {
  const {mainComponent, sidebarComponent, content, notifications, header} = props;
  const contentClassName = sidebarComponent? "col-sm-9" : "col-sm-9 center";

  if (mainComponent) {
    return <div>{mainComponent}</div>;
  }

  return (
    <div>
      {header}
      <div className="container">
        <div className="row">
          {sidebarComponent ? <div className="col-sm-3">{sidebarComponent}</div> : <div/>}
          <div className={contentClassName}>
            {notifications}
            {content || <p>Nothing to render</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
