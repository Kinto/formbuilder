import React from "react";
import { Link } from "react-router";

import btoa from "btoa";

export default function JsonSchemaDownloader(props) {
  const filename = props.schema.title + ".json";
  const fileContent = "data:text/plain;base64," + btoa(JSON.stringify(props.schema));

  return (
    <Link className="list-group-item" download={filename} to={fileContent}>
      <i className="glyphicon glyphicon-download" />&nbsp;
        Download JSON
    </Link>
  )
}
