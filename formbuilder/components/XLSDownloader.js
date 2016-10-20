import React from "react";
import json2xls from "json2xls";
import btoa from "btoa";

export default function XLSDownloader(props) {
  const filename = props.schema.title + ".xls";
  const fields = props.fields;
  const fieldNames = props.fields.map((key) => {
    return props.schema.properties[key].title;
  });

  // Pre-processing of data
  // json2xls takes json in the following format
  // json_data = [
  //   {
  //     col1: row1value1,
  //     col2: row1value2
  //   },
  //   {
  //     col1: row2value1,
  //     col2: row2value2
  //   }
  // ]
  // After the pre-processing is done, we will have data in
  // above mentioned format in `formattedData` which can be
  // then easily fed to `json2xls`.
  var formattedData = [];
  var rows = props.records;
  var recordsCount = rows.length;
  for ( var i = 0; i < recordsCount; i++ ) {
    var tempData = {};
    for ( var j = 0; j < fieldNames.length; j++ ) {
      tempData[fieldNames[j]] = rows[i][fields[j]];
    }
    formattedData.push(tempData);
  }
  // END of pre-processing

  var xls = json2xls(formattedData);
  const fileContent = "data:text/plain;base64," + btoa(xls);

  return <a download={filename}
            href={fileContent}
            className="btn btn-primary pull-right">Download XLS</a>;
}
