import {
  FIELD_ADD,
  FIELD_REMOVE,
  FIELD_UPDATE,
  FIELD_MOVE,
} from "../actions/fieldlist";

const INITIAL_STATE = {};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function moveInArray(array, from, to) {
  const arrayCopy = [].slice.call(array);
  if (to === from) {
    return arrayCopy;
  }
  arrayCopy.splice(to, 0, arrayCopy.splice(from, 1)[0]);
  return arrayCopy;
}

function generateUniqueFieldName(names) {
  const name = "field_" + Math.random().toString().substr(2, 7);
  if (names.indexOf(name) !== -1) {
    return generateUniqueFieldName(names);
  }
  return name;
}

function addField(state, field) {
  // Generating a usually temporary random, unique field name.
  const name = generateUniqueFieldName(Object.keys(state.schema.properties));
  state.schema.properties[name] = {...field.jsonSchema, title: name};
  state.uiSchema[name] = field.uiSchema;
  state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(name);
  state.editSchema[name] = field.editSchema;
  return state;
}

function removeField(state, name) {
  const requiredFields = state.schema.required || [];
  delete state.schema.properties[name];
  delete state.uiSchema[name];
  state.uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
    (field) => field !== name);
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

function moveField(state, name, direction) {
  const fields = Object.keys(state.schema.properties);
  const order = state.uiSchema["ui:order"] || fields;
  const from = order.indexOf(name);
  const to = direction === "up" && from > 0 ? from - 1 :
             direction === "down" && from < order.length - 1 ? from + 1 :
             from;
  state.uiSchema["ui:order"] = moveInArray(order, from, to);
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
  case FIELD_MOVE:
    return moveField(clone(state), action.name, action.direction);
  default:
    return state;
  }
}
