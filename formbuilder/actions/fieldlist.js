export const FIELD_ADD = "FIELD_ADD";
export const FIELD_REMOVE = "FIELD_REMOVE";
export const FIELD_UPDATE = "FIELD_UPDATE";
export const FIELD_MOVE = "FIELD_MOVE";

export function addField(field) {
  return {type: FIELD_ADD, field};
}

export function removeField(name) {
  return {type: FIELD_REMOVE, name};
}

export function updateField(name, schema, required) {
  return {type: FIELD_UPDATE, name, schema, required};
}

export function move(name, direction) {
  return {type: FIELD_MOVE, name, direction};
}
