import {
  FIELD_ADD,
  FIELD_REMOVE,
  FIELD_UPDATE
} from "../actions/fieldlist";

const INITIAL_STATE = {};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function addField(state, field) {
  // Generating a usually temporary random, unique field name.
  const name = btoa(Math.random());
  state.schema.properties[name] = field.jsonSchema;
  state.uiSchema[name] = field.uiSchema;
  state.editSchema[name] = field.editSchema;
  return state;
}

function removeField(state, name) {
  const requiredFields = state.schema.required || [];
  delete state.schema.properties[name];
  delete state.uiSchema[name];
  delete state.editSchema[name];
  state.schema.required = requiredFields
    .filter(requiredFieldName => name !== requiredFieldName);
  return state;
}

function updateField(state, name, schema, required) {
  const requiredFields = state.schema.required || [];
  state.schema.properties[name] = schema;
  if (required) {
    state.schema.required = requiredFields.concat(name);
  } else {
    state.schema.required = requiredFields
      .filter(requiredFieldName => name !== requiredFieldName);
  }
  return state;
}

export default function form(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FIELD_ADD:
    return addField(clone(state), action.field);
  case FIELD_REMOVE:
    return removeField(clone(state), action.name);
  case FIELD_UPDATE:
    return updateField(clone(state), action.name, action.schema, action.required);
  default:
    return state;
  }
}
