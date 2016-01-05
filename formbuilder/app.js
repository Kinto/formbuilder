import React, { Component } from "react";
import { render } from "react-dom";

import Form from "react-jsonschema-form";

import "./styles.css";

const schema = {type: "string"};
const uiSchema = {}
const formData = "toto"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="page-header">
          <h1>Formbuilder</h1>
        </div>
        <div className="col-md-6">
        </div>
        <div className="col-md-6">
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={formData} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
