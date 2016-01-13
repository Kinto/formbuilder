import React from "react";

export default function NotificationList(props) {
  const {notifications} = props;
  if (notifications.length === 0) {
    return <div/>;
  }
  return (
    <ul>{
      notifications.map((notif, index) => {
        return <li key={index}>{notif}</li>;
      })
    }</ul>
  );
}
