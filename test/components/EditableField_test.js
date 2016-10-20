/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";
import { Simulate } from "react-addons-test-utils";

import { createComponent, d } from "../test-utils";
import config from "../../formbuilder/config";
import EditableField from "../../formbuilder/components/builder/EditableField";


const {fieldList} = config;
const textField = fieldList.find(x => x.id === "text");

describe("EditableField", () => {
  var sandbox, compProps;

  const schema = textField.jsonSchema;
  const uiSchema = textField.uiSchema;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    compProps = {
      name: "field_1234567",
      schema,
      uiSchema,
      addField: sandbox.spy(),
      switchField: sandbox.spy(),
      updateField: sandbox.spy(),
      onChange: sandbox.spy(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Default state", () => {
    let comp;

    beforeEach(() => {
      comp = createComponent(EditableField, compProps);
    });

    it("should render an properties edition form", () => {
      expect(comp.query().classList.contains("field-editor"))
        .eql(true);
    });

    it("should update field properties", () => {
      const value = "modified";
      Simulate.change(comp.query("[type=text][value='Edit me']"), {
        target: {value}
      });
      return new Promise((r) => setTimeout(r, 10)).then(() => {
        Simulate.submit(comp.query("form"));
        expect(comp.query("label").textContent).eql(value);
      });
    });
  });

  describe("Field properties edition", () => {
    var comp;

    beforeEach(() => {
      comp = createComponent(EditableField, compProps);
      Simulate.click(comp.query("[name=close-btn]"));
    });

    it("should render a EditableField in render mode", () => {
      expect(comp.queryAll(".editable-field"))
        .to.have.length.of(1);
    });
  });
});
