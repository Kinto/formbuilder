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
      notifications.map((notif, index) => {
        const {message, type} = notif;
        const classes = `alert alert-${ERROR_CLASSES[type]}`;
        return (
          <div key={index} className={classes}>
            <a href="#" className="close"
              onClick={() => removeNotification(index)}>×</a>
            {message}
          </div>
        );
      })
    }</div>
  );
}
