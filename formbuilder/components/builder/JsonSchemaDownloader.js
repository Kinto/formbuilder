import React from "react";

import btoa from "btoa";

export default function JsonSchemaDownloader(props) {
  const filename = props.schema.title + ".json";
  const schemaFileContent = "data:application/json;base64," + btoa(JSON.stringify(props.schema));
  const uiSchemaFileContent = "data:application/json;base64," + btoa(JSON.stringify(props.uiSchema));

  return (
    <div>
      <a className="list-group-item" download={filename} href={schemaFileContent}>
        <i className="glyphicon glyphicon-download" />&nbsp;
          Download JSON schema
      </a>
      <a className="list-group-item" download={filename} href={uiSchemaFileContent}>
          <i className="glyphicon glyphicon-download" />&nbsp;
      Download JSON ui
      </a>
    </div>
  );
}
