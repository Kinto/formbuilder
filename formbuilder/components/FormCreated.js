import React from "react";
import {getUserToken, getUserURL, getAdminURL} from "../utils";


export default function FormCreated(props) {
  const adminToken = props.params.adminToken;
  const userToken = getUserToken(adminToken);

  const userformURL = getUserURL(userToken);
  const adminURL = getAdminURL(adminToken);

  return (
    <form>
      <h3>Here we go! Your form is now ready to be filled.</h3>
      <div className="form-group">
        <label>This is the <a href={userformURL}>link to give to the form fillers</a>:</label>
        <p>They will be presented the form you just built.</p>
        <URLDisplay url={userformURL} />

        <hr />

        <label>And this is the <a href={adminURL}>link to the administration dashboard</a>:</label>
          <p>Keep this URL in a safe place and give it only to the administrators.</p>
          <URLDisplay url={userformURL} type="admin" />
      </div>
    </form>
  );
}
