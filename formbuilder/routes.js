import React from "react";
import { Route, IndexRoute, Link } from "react-router";

import App from "./containers/App";
import FieldListContainer from "./containers/FieldListContainer";
import NotificationContainer from "./containers/NotificationContainer";
import FormContainer from "./containers/FormContainer";
import FormOptionsContainer from "./containers/FormOptionsContainer";
import JsonViewContainer from "./containers/JsonViewContainer";


const common = {
  notifications: NotificationContainer,
  fieldList: FieldListContainer,
};

const LinkBack = () => {
  return (
    <div className="list-group">
      <Link className="list-group-item" to="/">
        <i className="glyphicon glyphicon-chevron-left" />
        {" Back"}
      </Link>
    </div>
  );
};

export default (
  <Route path="/" component={App}>
    <IndexRoute components={{...common, content: FormContainer}} />
    <Route path="settings"
      components={{...common, fieldList: LinkBack, content: FormOptionsContainer}} />
    <Route path="json"
      components={{...common, fieldList: LinkBack, content: JsonViewContainer}} />
    <Route path="*" components={{
      fieldList: FieldListContainer,
      content: _ => <h1>Page not found.</h1>
    }}/>
  </Route>
);
