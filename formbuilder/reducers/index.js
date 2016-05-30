import { combineReducers } from "redux";

import form from "./form";
import notifications from "./notifications";
import serverStatus from "./serverStatus";
import records from "./records";
import dragndrop from "./dragndrop";


const rootReducer = combineReducers({
  notifications,
  form,
  serverStatus,
  records,
  dragndrop
});

export default rootReducer;
