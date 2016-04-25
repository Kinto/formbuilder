import {
  FORM_PUBLICATION_PENDING,
  FORM_PUBLICATION_DONE,
} from "../actions/server";

const INITIAL_STATE = {
  status: "init",
  collectionID: null,
};

export default function serverStatus(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FORM_PUBLICATION_PENDING:
    return {...state, status: "pending"};

  case FORM_PUBLICATION_DONE:
    return {
      ...state,
      status: "done",
      collectionID: action.collectionID,
    };
  default:
    return state;
  }
}
