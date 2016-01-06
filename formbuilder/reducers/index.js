import { combineReducers } from "redux";

import form from "./form";
import notifications from "./notifications";

const rootReducer = combineReducers({
  notifications,
  form,
});

export default rootReducer;
