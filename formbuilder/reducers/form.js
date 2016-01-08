import {
  FIELD_ADD,
  FIELD_REMOVE,
  FIELD_UPDATE
} from "../actions/fieldlist";

const INITIAL_STATE = {};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default function form(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FIELD_ADD:
    const { field } = action;
    // Generating a usually temporary random, unique field name.
    const name = btoa(Math.random());
    const addedState = clone(state);
    addedState.schema.properties[name] = field.jsonSchema;
    addedState.uiSchema[name] = field.uiSchema;
    addedState.editSchema[name] = field.editSchema;
    return addedState;

  case FIELD_REMOVE:
    const removedState = clone(state);
    delete removedState.schema.properties[action.name];
    delete removedState.uiSchema[action.name];
    delete removedState.editSchema[action.name];
    return removedState;

  case FIELD_UPDATE:
    const updatedState = clone(state);
    const requiredFields = updatedState.schema.required || [];
    updatedState.schema.properties[action.name] = action.schema;
    if (action.required) {
      updatedState.schema.required = requiredFields.concat(action.name);
    } else {
      updatedState.schema.required = requiredFields
        .filter(requiredFieldName => action.name !== requiredFieldName);
    }
    return updatedState;

  default:
    return state;
  }
}
