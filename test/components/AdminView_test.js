/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";

import { createComponent } from "../test-utils";
import AdminView from "../../formbuilder/components/AdminView";


describe("AdminView", () => {
  var sandbox, compProps, schema, uiSchema, records;
  const noop = () => {};

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    // Create stubs instead of doing real HTTP calls.
    uiSchema =  {
      "ui:order": []
    };
    schema = {
      title: "My new form",
      properties: []
    };
    records = [];

    compProps = {
      getRecords: noop,
      loadSchema: noop,
      schema,
      uiSchema,
      records,
      params: {adminToken: "12345678910"}
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("Default state", () => {
    it("should show the user a message if no data is present", () => {
      const comp = createComponent(AdminView, compProps);
      expect(comp.query().textContent).eql("loading");
    });
  });

  describe("Loaded records and schema", () => {
    beforeEach(() => {
      compProps.schema.properties = {
        "question-2": { title: "Question 2" },
        "question-1": { title: "Question 1" },
      };
      compProps.uiSchema["ui:order"] = ["question-1", "question-2"];
      compProps.records = [
          {"question-2": "Answer A2", "question-1": "Answer A1"},
          {"question-2": "Answer B2", "question-1": "Answer B1"},
      ];
    });

    it("should show the fields ordered properly", () => {
      const comp = createComponent(AdminView, compProps);
      let titles = Array.map(comp.queryAll("thead th"), (title) => {
        return title.textContent;
      });
      expect(titles).eql(["Question 1", "Question 2"]);
    });

    it("should show the results in a table", () => {
      const comp = createComponent(AdminView, compProps);

      // Retrieve all fields of each records.
      records = Array.map(comp.queryAll("tbody tr"), (tr) => {
        return Array.map(tr.querySelectorAll("td"), (td) => {
          return td.textContent;
        });
      });
      expect(records).eql([
        ["Answer A1", "Answer A2"],
        ["Answer B1", "Answer B2"],
      ]);
    });

    it("should stringify the values of the records", () => {
      compProps.records = [
          {"question-2": ["one", "two"], "question-1": "Answer A1"},
          {"question-2": ["three", "four"], "question-1": "Answer B1"},
      ];

      const comp = createComponent(AdminView, compProps);

      // Retrieve all fields of each records.
      records = Array.map(comp.queryAll("tbody tr"), (tr) => {
        return Array.map(tr.querySelectorAll("td"), (td) => {
          return td.textContent;
        });
      });
      expect(records).eql([
        ["Answer A1", "one,two"],
        ["Answer B1", "three,four"],
      ]);
    });
  });
});
