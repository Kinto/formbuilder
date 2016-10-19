import React from "react";

import btoa from "btoa";

export default function JsonSchemaDownloader(props) {
  const filename = props.schema.title + ".json";
  const fileContent = "data:application/json;base64," + btoa(JSON.stringify(props.schema));

  return (
    <a className="list-group-item" download={filename} href={fileContent}>
      <i className="glyphicon glyphicon-download" />&nbsp;
        Download JSON
    </a>
  );
}
