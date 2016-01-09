import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import "./styles.css";

import configureStore from "./store/configureStore";
import NotificationContainer from "./containers/NotificationContainer";
import FieldListContainer from "./containers/FieldListContainer";
import FormContainer from "./containers/FormContainer";

const store = configureStore({
  notifications: [],
  form: {
    schema: {
      type: "object",
      properties: {}
    },
    uiSchema: {
      "ui:order": []
    },
    formData: {},
  }
});

render((
  <Provider store={store}>
    <div className="container">
      <div className="page-header">
        <h1>FormBuilder</h1>
      </div>
      <NotificationContainer />
      <div className="row">
        <div className="col-sm-4">
          <FieldListContainer />
        </div>
        <div className="col-sm-8">
          <FormContainer />
        </div>
      </div>
    </div>
  </Provider>
), document.getElementById("app"));
