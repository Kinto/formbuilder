import { combineReducers } from "redux";

import form from "./form";
import notifications from "./notifications";
import publicationStatus from "./publicationStatus";

const rootReducer = combineReducers({
  notifications,
  form,
  publicationStatus,
});

export default rootReducer;
