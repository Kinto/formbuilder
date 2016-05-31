/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";
import { Simulate } from "react-addons-test-utils";

import { createComponent, d } from "../test-utils";
import UserForm from "../../formbuilder/components/UserForm";


describe("UserForm", () => {
  var sandbox, compProps, schema;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    // Create stubs instead of doing real HTTP calls.
    schema = {
      "title": "A registration form",
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "title": "First name"
        },
        "lastName": {
          "type": "string",
          "title": "Last name"
        }
      }
    };

    compProps = {
      params: {id: 1234},
      schema,
      uiSchema: {},
      loadSchema: sandbox.spy(),
      submitRecord: () => {},
      history: {
        pushState: sandbox.spy()
      }
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should call loadSchema() when no schema is present", () => {
    compProps.schema.properties = [];
    createComponent(UserForm, compProps);
    expect(compProps.loadSchema.calledOnce).to.be.True;
  });

  it("should submit the new record and redirect on submission", (done) => {
    sinon.stub(compProps, "submitRecord", (formData, id, callback) => {
      expect(formData).to.eql({
        "firstName": "John",
        "lastName": "Doe"
      });
      expect(id).to.eql(1234);
      callback();
      expect(compProps.history.pushState.calledWith(null, "/form/data-sent")).to.be.True;
      done();
    });
    const comp = createComponent(UserForm, compProps);
    Simulate.change(comp.query("#root_firstName"), {
      target: {value: "John"}
    });
    Simulate.change(comp.query("#root_lastName"), {
      target: {value: "Doe"}
    });
    return new Promise(setImmediate).then(() => {
      Simulate.submit(comp.query("form"));
      expect(compProps.submitRecord.calledOnce).to.be.True;
    });

  });
});
