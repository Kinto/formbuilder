import React from "react";
import { Route, IndexRoute } from "react-router";

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

export default (
  <Route path="/" component={App}>
    <IndexRoute components={{...common, content: FormContainer}} />
    <Route path="settings"
      components={{...common, content: FormOptionsContainer}} />
    <Route path="json"
      components={{...common, content: JsonViewContainer}} />
    <Route path="*" components={{
      fieldList: FieldListContainer,
      content: _ => <h1>Page not found.</h1>
    }}/>
  </Route>
);
