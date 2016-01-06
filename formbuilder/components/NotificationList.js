import React, { Component } from "react";

export default class NotificationList extends Component {
  render() {
    return <ul> {
      this.props.notifications.map(notif => {
        return <li>{notif}</li>;
      })
    }
    </ul>;
  }
}
