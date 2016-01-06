import React, { Component } from "react";

export default class NotificationList extends Component {
  render() {
    return <ul> {
      this.props.notifications.map((notif, index) => {
        return <li key={index}>{notif}</li>;
      })
    }
    </ul>;
  }
}
