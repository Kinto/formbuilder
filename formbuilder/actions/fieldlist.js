export const FIELD_ADD = "FIELD_ADD";

export function addField(field) {
  return {type: FIELD_ADD, field};
}
