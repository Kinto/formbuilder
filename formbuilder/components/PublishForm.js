import React from "react";
import { Link } from "react-router";


export default function PublishForm(props) {
  console.log(props.publicationStatus);
  const collectionID = props.publicationStatus.collectionID;
  return (
    <div>
      <h3>Your form is ready to be filled!</h3>
      <Link to={`/form/${collectionID}`}>Your form is here</Link>
    </div>
  );
}
