import React from "react";
import json2xls from "json2xls";
import btoa from "btoa";

export default function XLSDownloader(props) {
  const filename = props.schema.title + ".xls";
  const fields = props.fields;
  const fieldNames = props.fields.map((key) => {
    return props.schema.properties[key].title;
  });

  var formatted_data = [];
  var rows = props.records;
  var records_count = rows.length;
  for ( var i = 0; i < records_count; i++ ) {
    var temp_data = {};
    for ( var j = 0; j < fieldNames.length; j++ ) {
      temp_data[fieldNames[j]] = rows[i][fields[j]];
    }
    formatted_data.push(temp_data);
  }

  var xls = json2xls(formatted_data);
  const fileContent = "data:text/plain;base64," + btoa(xls);

  return <a download={filename}
            href={fileContent}
            className="btn btn-primary pull-right">Download XLS</a>;
}
