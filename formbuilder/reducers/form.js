import {
  FIELD_ADD,
} from "../actions/fieldlist";

const INITIAL_STATE = {};

export default function form(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FIELD_ADD:
    const { field } = action;
    const name = btoa(Math.random());
    const newState = JSON.parse(JSON.stringify(state));
    newState.schema.properties[name] = field.jsonSchema;
    newState.uiSchema[name] = field.uiSchema;
    return newState;
  default:
    return state;
  }
}
