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

      <h3>I found a bug, where can I report it?</h3>
      <p>We are currently using Github to manage issues.
      If you want, you can open an issue <a href="https://www.github.com/kinto/formbuilder/issues">on our bugtracker</a>.
      You can also <a href="mailto:contact@fourmilieres.net">send us an email</a> or come talk with us on our IRC channel <code>#kinto</code> on <code>irc.freenode.net</code> —
      (<a href="https://kiwiirc.com/client/irc.freenode.net/?#kinto">Click here to access the web client</a>).</p>
    </div>
  );
}
