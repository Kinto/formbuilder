import React, { Component } from "react";

import {Dropdown, MenuItem}  from "react-bootstrap";

import CSVDownloader from "./CSVDownloader";
import XLSDownloader from "./XLSDownloader";

import config from "../config";

export default class DownloadFormatDropdown extends Component {
  render () {
    return (
      <Dropdown id="split-button-dropup">
        <Dropdown.Menu>
          <MenuItem>

          </MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DownloadFormatDropdown.defaultProps = {
  bsStyle: "default"
};
