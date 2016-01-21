/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";
import { Simulate } from "react-addons-test-utils";

import { createComponent } from "../test-utils";
import config from "../../formbuilder/config";
import EditableField from "../../formbuilder/components/EditableField";


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
      updateField: sandbox.spy(),
      onChange: sandbox.spy(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Default state", () => {
    it("should render an editable field", () => {
      const comp = createComponent(EditableField, compProps);

      expect(comp.queryAll(".editable-field"))
        .to.have.length.of(1);
    });
  });

  describe("Field properties edition", () => {
    var comp;

    beforeEach(() => {
      comp = createComponent(EditableField, compProps);
      Simulate.click(comp.query(".edit-btn"));
    });

    it("should render a properties edition form", () => {
      expect(comp.query().classList.contains("field-editor"))
        .eql(true);
    });

    it("should update field properties", () => {
      const value = "modified";
      Simulate.change(comp.query("[type=text][value='Edit me']"), {
        target: {value}
      });
      Simulate.submit(comp.query("form"));

      expect(comp.query("label").textContent).eql(value);
    });

    it("should generate a sluggified field name", () => {
      Simulate.change(comp.query("[type=text][value='Edit me']"), {
        target: {value: "I want a slug"}
      });

      expect(comp.query("[type=text]").value).eql("i_want_a_slug");
    });
  });
});
