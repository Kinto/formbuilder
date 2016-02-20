import { combineReducers } from "redux";

import form from "./form";
import notifications from "./notifications";
import publicationStatus from "./publicationStatus";
import records from "./records";


const rootReducer = combineReducers({
  notifications,
  form,
  publicationStatus,
  records
});

export default rootReducer;
