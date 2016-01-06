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
    schema: {},
    uiSchema: {},
    formData: {}
  }
});

render((
  <Provider store={store}>
    <div>
    <NotificationContainer />
    <FieldListContainer />
    <FormContainer />
    </div>
  </Provider>
), document.getElementById("app"));
