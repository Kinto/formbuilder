import {
  FIELD_ADD,
} from "../actions/fieldlist";

const INITIAL_STATE = [];

export default function collections(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FIELD_ADD:
    return [...state, action.notification];
  default:
    return state;
  }
}
