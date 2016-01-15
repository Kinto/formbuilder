import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
const createHashHistory = require("history/lib/createHashHistory");

import routes from "./routes";
import configureStore from "./store/configureStore";

import "./styles.css";


const store = configureStore({
  notifications: [],
});
const history = createHashHistory();

render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById("app"));
