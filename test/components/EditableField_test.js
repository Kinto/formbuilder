/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";
import React from "react";
import { Simulate, renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";

import config from "../../formbuilder/config";
import EditableField from "../../formbuilder/components/EditableField";


const {fieldList} = config;
const textField = fieldList.find(x => x.id === "text");

function createComponent(props) {
  const comp = renderIntoDocument(<EditableField {...props} />);
  const findAll = (selector) => {
    const element = findDOMNode(comp);
    if (selector) {
      return element.querySelectorAll(selector);
    }
    return element;
  };
  const findOne = (selector) => {
    const element = findDOMNode(comp);
    if (selector) {
      return element.querySelector(selector);
    }
    return element;
  };
  return {...comp, findOne, findAll};
}

function d(node) {
  console.log(require("html").prettyPrint(node.outerHTML, {indent_size: 2}));
}

describe("EditableField", () => {
  var sandbox, compProps;

  const schema = textField.jsonSchema;
  const uiSchema = textField.uiSchema;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    compProps = {
      schema,
      uiSchema,
      addField: sandbox.spy(),
      updateField: sandbox.spy(),
      onChange: sandbox.spy(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Default state", () => {
    it("should render an editable field", () => {
      const comp = createComponent(compProps);

      expect(comp.findAll(".editable-field"))
        .to.have.length.of(1);
    });
  });

  describe("Field properties edition", () => {
    var comp;

    beforeEach(() => {
      comp = createComponent(compProps);
      Simulate.click(comp.findOne(".edit-btn"));
    });

    it("should render a properties edition form", () => {
      expect(comp.findOne().classList.contains("field-editor"))
        .eql(true);
    });

    it("should update field properties", () => {
      const value = "modified";
      Simulate.change(comp.findOne("[type=text][value='Edit me']"), {
        target: {value}
      });
      Simulate.submit(comp.findOne("form"));

      expect(comp.findOne("label").textContent).eql(value);
    });
  });
});
