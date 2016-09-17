import S from "string";

import {
  FIELD_ADD,
  FIELD_SWITCH,
  FIELD_REMOVE,
  FIELD_UPDATE,
  FIELD_INSERT,
  FIELD_SWAP,
  FORM_RESET,
  FORM_UPDATE_TITLE,
  FORM_UPDATE_DESCRIPTION,
} from "../actions/fieldlist";

import {SCHEMA_RETRIEVAL_DONE} from "../actions/server";

const INITIAL_STATE = {
  error: null,
  schema: {
    type: "object",
    title: "Untitled form",
    description: "Enter some description for your form here",
    properties: {}
  },
  uiSchema: {
    "ui:order": []
  },
  formData: {},
  currentIndex: 0,
};

function slugify(string) {
  return S(string).slugify().replace("-", "_").s;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function unique(array) {
  return Array.from(new Set(array));
}

function addField(state, field) {
  // Generating a usually temporary random, unique field name.
  state.currentIndex += 1;
  const name = `Question ${state.currentIndex}`;
  const _slug = slugify(name);
  state.schema.properties[_slug] = {...field.jsonSchema, title: name};
  state.uiSchema[_slug] = field.uiSchema;
  state.uiSchema["ui:order"] = (state.uiSchema["ui:order"] || []).concat(_slug);
  return state;
}

function switchField(state, propertyName, newField) {
  state.schema.properties[propertyName] = {...newField.jsonSchema};
  state.uiSchema[propertyName] = newField.uiSchema;

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
  if (state.schema.required.length === 0) {
    delete state.schema.required;
  }
  return {...state, error: null};
}

function updateField(state, name, schema, required, newLabel) {
  const existing = Object.keys(state.schema.properties);
  const newName = slugify(newLabel);
  if (name !== newName && existing.indexOf(newName) !== -1) {
    // Field name already exists, we can't update state
    const error = `Duplicate field name "${newName}", operation aborted.`;
    return {...state, error};
  }
  const requiredFields = state.schema.required || [];
  state.schema.properties[name] = schema;
  if (required) {
    // Ensure uniquely required field names
    state.schema.required = unique(requiredFields.concat(name));
  } else {
    state.schema.required = requiredFields
      .filter(requiredFieldName => name !== requiredFieldName);
  }
  if (newName !== name) {
    return renameField(state, name, newName);
  }
  return {...state, error: null};
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
  return {...state, error: null};
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
  return {...insertedState, error: null};
}

function swapFields(state, source, target) {
  const order = state.uiSchema["ui:order"];
  const idxSource = order.indexOf(source);
  const idxTarget = order.indexOf(target);
  order[idxSource] = target;
  order[idxTarget] = source;
  return {...state, error: null};
}

function updateFormTitle(state, {title}) {
  state.schema.title = title;
  return {...state, error: null};
}

function updateFormDescription(state, {description}) {
  state.schema.description = description;
  return {...state, error: null};
}

function setSchema(state, data) {
  state.schema = data.schema;
  state.uiSchema = data.uiSchema;
  return {...state, error: null};
}

export default function form(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FIELD_ADD:
    return addField(clone(state), action.field);
  case FIELD_SWITCH:
    return switchField(clone(state), action.property, action.newField);
  case FIELD_REMOVE:
    return removeField(clone(state), action.name);
  case FIELD_UPDATE:
    const {name, schema, required, newName} = action;
    return updateField(clone(state), name, schema, required, newName);
  case FIELD_INSERT:
    return insertField(clone(state), action.field, action.before);
  case FIELD_SWAP:
    return swapFields(clone(state), action.source, action.target);
  case FORM_RESET:
    return INITIAL_STATE;
  case FORM_UPDATE_TITLE:
    return updateFormTitle(clone(state), action.title);
  case FORM_UPDATE_DESCRIPTION:
    return updateFormDescription(clone(state), action.description);
  case SCHEMA_RETRIEVAL_DONE:
    return setSchema(clone(state), action.data);
  default:
    return state;
  }
}
