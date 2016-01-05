import { combineReducers } from "redux";

import notifications from "./notifications";

const rootReducer = combineReducers({
  notifications,
});

export default rootReducer;
