import React from "react";
import config from "../config";

export default function RecordCreated(props) {

  // Issue #130 - Change title back to project name after submitting the form
  document.title = config.projectName;

  return (
    <div>
      <h3>Submitted!</h3>
      Thanks, your data has been submitted!
    </div>
  );
}
