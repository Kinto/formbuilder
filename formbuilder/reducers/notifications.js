import {
  NOTIFICATION_ADD,
  NOTIFICATION_REMOVE,
} from "../actions/notifications";

const INITIAL_STATE = [];

export default function collections(state = INITIAL_STATE, action) {
  switch(action.type) {

  case NOTIFICATION_ADD:
    return [...state, action.notification];

  case NOTIFICATION_REMOVE:
    return state.filter(({id}) => action.id !== id);

  default:
    return state;
  }
}
