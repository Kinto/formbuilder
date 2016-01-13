import {
  FIELD_ADD,
  FIELD_REMOVE,
  FIELD_UPDATE,
  FIELD_INSERT,
  FIELD_MOVE,
  FIELD_SWAP,
  FORM_UPDATE_PROPERTIES,
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
  return state;
}

function removeField(state, name) {
  const requiredFields = state.schema.required || [];
  delete state.schema.properties[name];
  delete state.uiSchema[name];
  state.uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
    (field) => field !== name);
  state.schema.required = requiredFields
    .filter(requiredFieldName => name !== requiredFieldName);
  return state;
}

function updateField(state, name, schema, required, newName) {
  const requiredFields = state.schema.required || [];
  state.schema.properties[name] = schema;
  if (required) {
    state.schema.required = requiredFields.concat(name);
  } else {
    state.schema.required = requiredFields
      .filter(requiredFieldName => name !== requiredFieldName);
  }
  if (newName !== name) {
    return renameField(state, name, newName);
  }
  return state;
}

function renameField(state, name, newName) {
  const schema = clone(state.schema.properties[name]);
  const uiSchema = clone(state.uiSchema[name]);
  const order = state.uiSchema["ui:order"];
  const required = state.schema.required;
  delete state.schema.properties[name];
  delete state.uiSchema[name];
  state.schema.properties[newName] = schema;
  state.schema.required = required.map(fieldName => {
    return fieldName === name ? newName : fieldName;
  });
  state.uiSchema[newName] = uiSchema;
  state.uiSchema["ui:order"] = order.map(fieldName => {
    return fieldName === name ? newName : fieldName;
  });
  return state;
}

function insertField(state, field, before) {
  const insertedState = addField(state, field);
  const order = insertedState.uiSchema["ui:order"];
  const added = order[order.length - 1];
  const idxBefore = order.indexOf(before);
  const newOrder = [].concat(
    order.slice(0, idxBefore),
    added,
    order.slice(idxBefore, order.length - 1)
  );
  insertedState.uiSchema["ui:order"] = newOrder;
  return insertedState;
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

function swapFields(state, source, target) {
  const order = state.uiSchema["ui:order"];
  const idxSource = order.indexOf(source);
  const idxTarget = order.indexOf(target);
  order[idxSource] = target;
  order[idxTarget] = source;
  return state;
}

function updateFormProperties(state, {title, description}) {
  state.schema.title = title;
  state.schema.description = description;
  return state;
}

export default function form(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FIELD_ADD:
    return addField(clone(state), action.field);
  case FIELD_REMOVE:
    return removeField(clone(state), action.name);
  case FIELD_UPDATE:
    const {name, schema, required, newName} = action;
    return updateField(clone(state), name, schema, required, newName);
  case FIELD_INSERT:
    return insertField(clone(state), action.field, action.before);
  case FIELD_MOVE:
    return moveField(clone(state), action.name, action.direction);
  case FIELD_SWAP:
    return swapFields(clone(state), action.source, action.target);
  case FORM_UPDATE_PROPERTIES:
    return updateFormProperties(clone(state), action.properties);
  default:
    return state;
  }
}
