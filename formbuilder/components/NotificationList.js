import React from "react";

const ERROR_CLASSES = {
  error: "danger",
  info: "info",
};

export default function NotificationList(props) {
  const {notifications, removeNotification} = props;
  if (notifications.length === 0) {
    return <div/>;
  }
  return (
    <div>{
      notifications.map((notif) => {
        const {message, type, id} = notif;
        const classes = `alert alert-${ERROR_CLASSES[type]}`;
        return (
          <div key={id} className={classes}>
            <a className="close"
              onClick={() => removeNotification(id)}>×</a>
            {message}
          </div>
        );
      })
    }</div>
  );
}
