import React from "react";
import {getFormID, getFormURL, getAdminURL} from "../utils";
import URLDisplay from "./URLDisplay";

export default function FormCreated(props) {
  const adminToken = props.params.adminToken;
  const formID = getFormID(adminToken);

  const userformURL = getFormURL(formID);
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
          <URLDisplay url={adminURL} type="admin" />
      </div>
    </form>
  );
}
