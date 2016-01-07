import {
  FIELD_ADD,
  FIELD_REMOVE
} from "../actions/fieldlist";

const INITIAL_STATE = {};

export default function form(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FIELD_ADD:
    const { field } = action;
    const name = btoa(Math.random());
    const addedState = JSON.parse(JSON.stringify(state));
    addedState.schema.properties[name] = field.jsonSchema;
    addedState.uiSchema[name] = field.uiSchema;
    return addedState;
  case FIELD_REMOVE:
    const removedState = JSON.parse(JSON.stringify(state));
    delete removedState.schema.properties[action.name];
    delete removedState.uiSchema.properties[action.name];
    return removedState;
  default:
    return state;
  }
}
