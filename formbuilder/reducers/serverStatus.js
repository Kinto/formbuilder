import {
  FORM_PUBLICATION_PENDING,
  FORM_PUBLICATION_DONE,
  FORM_PUBLICATION_FAILED
} from "../actions/server";

const INITIAL_STATE = {
  status: "init",
  collection: null,
};

export default function serverStatus(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FORM_PUBLICATION_FAILED:
    return {...state, status: "failed"};

  case FORM_PUBLICATION_PENDING:
    return {...state, status: "pending"};

  case FORM_PUBLICATION_DONE:
    return {
      ...state,
      status: "done",
      collection: action.collection,
    };
  default:
    return state;
  }
}
