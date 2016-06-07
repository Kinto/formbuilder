import React from "react";
import { Link } from "react-router";


export default function Header(props) {
  return (
    <div className="navbar navbar-default navbar-static-top" role="navigation">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Kinto formbuilder</a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/faq">FAQ</Link></li>
          <li><a href="http://kinto.readthedocs.org/en/latest/overview.html">Our values</a></li>
        </ul>
      </div>
    </div>
  </div>);
}
