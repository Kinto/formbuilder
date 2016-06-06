import React from "react";
import config from "../config";

export default function FAQ(props) {

  return (
    <div>
      <h3>Where is the data stored?</h3>
      <p>We believe to the separation of application logic and data.
        In the future, we plan to let the form creator chose the location for the data,
        but for now {config.projectName} stores the data in a <a href="https://kinto-storage.org">Kinto</a> instance it hosts.
      </p>
    </div>
  );
}
