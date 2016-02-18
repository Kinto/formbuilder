export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE";

export function addNotification(notification) {
  return {type: NOTIFICATION_ADD, notification};
}

export function removeNotification(index) {
  return {type: NOTIFICATION_REMOVE, index};
}
