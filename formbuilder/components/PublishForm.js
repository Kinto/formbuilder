import React from "react";


export default function PublishForm(props) {
  console.log(props.publicationStatus);
  const collectionID = props.params.id;
  const origin = window.location.origin;
  const userformURL = `${origin}/#/form/${collectionID}`;
  const adminURL = `${origin}/#/admin/${collectionID}`;
  return (
    <div>
      <h3>Your form is ready to be filled!</h3>
      <div className="form-group">
        <label>Link to fill the form</label>
        <input type="text" className="form-control" value={userformURL} />
      </div>
      <div className="form-group">
        <label>Link to the admin</label>
        <input type="text" className="form-control" value={adminURL} />
      </div>
    </div>
  );
}
