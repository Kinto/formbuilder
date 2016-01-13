export const FIELD_ADD = "FIELD_ADD";
export const FIELD_REMOVE = "FIELD_REMOVE";
export const FIELD_UPDATE = "FIELD_UPDATE";
export const FIELD_INSERT = "FIELD_INSERT";
export const FIELD_SWAP = "FIELD_SWAP";
export const FORM_UPDATE_PROPERTIES = "FORM_UPDATE_PROPERTIES";

export function addField(field) {
  return {type: FIELD_ADD, field};
}

export function insertField(field, before) {
  return {type: FIELD_INSERT, field, before};
}

export function removeField(name) {
  return {type: FIELD_REMOVE, name};
}

export function updateField(name, schema, required, newName) {
  return {type: FIELD_UPDATE, name, schema, required, newName};
}

export function swapFields(source, target) {
  return {type: FIELD_SWAP, source, target};
}

export function updateFormProperties(properties) {
  return {type: FORM_UPDATE_PROPERTIES, properties};
}
