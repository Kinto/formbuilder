export const FIELD_ADD = "FIELD_ADD";
export const FIELD_REMOVE = "FIELD_REMOVE";

export function addField(field) {
  return {type: FIELD_ADD, field};
}

export function removeField(name) {
  return {type: FIELD_REMOVE, name};
}
