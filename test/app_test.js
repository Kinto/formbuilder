/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";
import React from "react";
import { Simulate, renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import App from "../formbuilder";

function createComponent(props) {
  const comp = renderIntoDocument(<App {...props} />);
  const node = findDOMNode(comp);
  return {comp, node};
}

function d(node) {
  console.log(require("html").prettyPrint(node.outerHTML, {indent_size: 2}));
}

describe("Form", () => {
  var sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });
});
