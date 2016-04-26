import uuid from "uuid";

export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE";

export function addNotification(message, type="info", autoDismiss=true) {
  return (dispatch) => {
    const id = uuid.v4();
    dispatch({type: NOTIFICATION_ADD, notification: {id, message, type}});
    if (autoDismiss == true) {
      setTimeout(() => {
        dispatch({type: NOTIFICATION_REMOVE, id});
      }, 5000);
    }
  };
}

export function removeNotification(id) {
  return {type: NOTIFICATION_REMOVE, id};
}
