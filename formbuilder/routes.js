import React from "react";
import { Route, IndexRoute, Link } from "react-router";

import App from "./containers/App";
import FieldListContainer from "./containers/builder/FieldListContainer";
import FormContainer from "./containers/builder/FormContainer";
import FormOptionsContainer from "./containers/builder/FormOptionsContainer";
import JsonViewContainer from "./containers/builder/JsonViewContainer";

import NotificationContainer from "./containers/NotificationContainer";
import FormCreatedContainer from "./containers/FormCreatedContainer";
import UserFormContainer from "./containers/UserFormContainer";
import RecordCreatedContainer from "./containers/RecordCreatedContainer";
import AdminViewContainer from "./containers/AdminViewContainer";

const common = {
  notifications: NotificationContainer,
  fieldList: FieldListContainer,
  displayTitle: true
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
      <Route path="builder/settings"
        components={{...common, fieldList: LinkBack, content: FormOptionsContainer}} />
      <Route path="builder/json"
        components={{...common, fieldList: LinkBack, content: JsonViewContainer}} />
      <Route path="builder/published/:id"
        components={{...common, fieldList: LinkBack, content: FormCreatedContainer}} />
      <Route path="form/data-sent"
        components={{...common, fieldList: LinkBack, content: RecordCreatedContainer}} />
      <Route path="form/:id"
        components={{...common, fieldList: null, displayTitle: null, content: UserFormContainer}} />
      <Route path="admin/:id"
        components={{...common, fieldList: null, displayTitle: null, content: AdminViewContainer}} />
      <Route path="*" components={{
        fieldList: FieldListContainer,
        content: _ => <h1>Page not found.</h1>
      }}/>
    </Route>
  );
