import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import NotificationContainer from "./containers/NotificationContainer";

const store = configureStore({
  notifications: ["super !", "trop fort!", "jénial!"]
});

import "./styles.css";

render((
  <Provider store={store}>
    <NotificationContainer />
  </Provider>
), document.getElementById("app"));
