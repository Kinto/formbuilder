import React from "react";

export default function CSVDownloader(props) {
  const filename = props.schema.title + ".csv";
  const titles = props.fields.map((key) => {
    return props.schema.properties[key].title;
  });
  let content = "\"" + titles.join("\";\"") + "\";\n";
  content = content + props.records.map((record) => {
    return props.fields
      .map((field) => {
        return record[field];
      })
      .reduce((prev, curr) => {
        return prev + "\"" + String(curr).replace("\"", "\\\"") + "\";";
      }, "") + "\n";
  }).reduce((prev, curr) => {
    return prev + curr;
  }, "");
  const fileContent = "data:text/plain;base64," + btoa(content);

  return <a download={filename}
            href={fileContent}
            className="btn btn-primary pull-right">Download CSV</a>;
}
