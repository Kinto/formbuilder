import { combineReducers } from "redux";

import form from "./form";
import notifications from "./notifications";
import serverStatus from "./serverStatus";
import records from "./records";


const rootReducer = combineReducers({
  notifications,
  form,
  serverStatus,
  records
});

export default rootReducer;
