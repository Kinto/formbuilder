export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE";

export function add_notification(notification) {
  return {type: NOTIFICATION_ADD, notification};
}

export function remove_notification(index) {
  return {type: NOTIFICATION_REMOVE, index};
}
