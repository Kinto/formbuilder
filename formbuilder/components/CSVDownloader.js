import React from "react";
import json2csv from "json2csv";
import btoa from "btoa";

export default function CSVDownloader(props) {
  const filename = props.schema.title + ".csv";
  const fields = props.fields;
  const fieldNames = props.fields.map((key) => {
    return props.schema.properties[key].title;
  });
  var csv = json2csv({ data: props.records, fields: fields, fieldNames: fieldNames});
  const fileContent = "data:text/plain;base64," + btoa(csv);

  return <a download={filename}
            href={fileContent}
            className="btn btn-primary pull-right">Download CSV</a>;
}
