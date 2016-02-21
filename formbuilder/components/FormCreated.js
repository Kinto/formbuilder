import React from "react";


export default function FormCreated(props) {
  const collectionID = props.params.id;
  const origin = window.location.origin;
  const userformURL = `${origin}/#/form/${collectionID}`;
  const adminURL = `${origin}/#/admin/${collectionID}`;

  const onClick = (e) => {
    e.target.select();
  };

  return (
    <div>
      <h3>Your form is ready to be filled!</h3>
      <div className="form-group">
        <label>Link to fill the form <a href={userformURL}>🔗</a></label>
        <input onClick={onClick} type="text" className="form-control" value={userformURL} />
      </div>
      <div className="form-group">
        <label>Link to the admin <a href={adminURL}>🔗</a></label>
        <input onClick={onClick} type="text" className="form-control" value={adminURL} />
      </div>
    </div>
  );
}
