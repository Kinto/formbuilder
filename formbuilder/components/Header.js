import React from "react";

export default function Header(props) {
  return (
    <div className="navbar navbar-default navbar-static-top" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Kinto formbuilder</a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="http://kinto.readthedocs.org/en/latest/overview.html">Our values</a></li>
        </ul>
      </div>
    </div>
  </div>);
}
