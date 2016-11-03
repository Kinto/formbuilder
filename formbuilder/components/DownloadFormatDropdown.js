import React, { Component } from "react";

import {Dropdown, MenuItem}  from "react-bootstrap";

import CSVDownloader from "./CSVDownloader";
import XLSDownloader from "./XLSDownloader";

import config from "../config";

export default class DownloadFormatDropdown extends Component {
  constructor(props) {
    super(props);
  }

  handleDownloadFormatAction(formatIndex, event) {
    console.log("action called");
  }

  render () {
    return (
      <Dropdown id="split-button-dropup">
        <Dropdown.Toggle bsStyle={this.props.bsStyle}>
          {this.props.children}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {["CSV", "XLS"].map((format, index) => {
            return <MenuItem key={index}
                eventKey={index}
                onSelect={this.handleDownloadFormatAction.bind(this)}
                >as {format}
              </MenuItem>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DownloadFormatDropdown.defaultProps = {
  bsStyle: "default"
};
