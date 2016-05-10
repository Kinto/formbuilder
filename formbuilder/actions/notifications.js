import uuid from "uuid";

export const NOTIFICATION_ADD = "NOTIFICATION_ADD";
export const NOTIFICATION_REMOVE = "NOTIFICATION_REMOVE";


export function addNotification(message, options) {
  const defaultOptions = {
    type: "info",
    autoDismiss: null,
    dismissAfter: 5000
  };
  let {type, autoDismiss, dismissAfter} = {
    ...defaultOptions,
    ...options
  };
  if (autoDismiss == null) {
    autoDismiss = type !== "error";
  }
  return (dispatch) => {
    const id = uuid.v4();
    dispatch({type: NOTIFICATION_ADD, notification: {id, message, type}});
    if (autoDismiss === true) {
      setTimeout(() => {
        dispatch({type: NOTIFICATION_REMOVE, id});
      }, dismissAfter);
    }
  };
}

export function removeNotification(id) {
  return {type: NOTIFICATION_REMOVE, id};
}
