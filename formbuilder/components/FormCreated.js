import React from "react";
import {getUserToken} from "../utils";

export default function FormCreated(props) {
  const adminToken = props.params.adminToken;
  const userToken = getUserToken(adminToken);
  const origin = window.location.origin + window.location.pathname;
  const userformURL = `${origin}#/form/${userToken}`;
  const adminURL = `${origin}#/admin/${adminToken}`;

  const onClick = (e) => {
    e.target.select();
  };

  return (
    <form>
      <h3>Here we go! Your form is now ready to be filled.</h3>
      <div className="form-group">
        <label>This is the <a href={userformURL}>link to give to the form fillers</a>:</label>
        <p>They will be presented the form you just built.</p>
        <div className="input-group input-group-lg">
          <span className="input-group-addon"><i className="glyphicon glyphicon-bullhorn" /></span>
          <input onClick={onClick} type="text" className="form-control" defaultValue={userformURL} />
        </div>

        <hr />

        <label>And this is the <a href={adminURL}>link to the administration dashboard</a>:</label>
          <p>Keep this URL in a safe place and give it only to the administrators.</p>
          <div className="input-group input-group-lg">
          <span className="input-group-addon"><i className="glyphicon glyphicon-eye-close" /></span>
          <input onClick={onClick} type="text" className="form-control" defaultValue={adminURL} />
        </div>
      </div>
    </form>
  );
}
