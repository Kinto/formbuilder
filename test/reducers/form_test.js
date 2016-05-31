/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";

import form from "../../formbuilder/reducers/form";
import * as actions from "../../formbuilder/actions/fieldlist";
import config from "../../formbuilder/config";


const {fieldList} = config;
const textField = fieldList.find(x => x.id === "text");
const multilineTextField = fieldList.find(x => x.id === "multilinetext");
const radioButtonField = fieldList.find(x => x.id === "radiobuttonlist");

describe("form reducer", () => {
  describe("FIELD_ADD action", () => {
    var state, firstFieldAdded;

    beforeEach(() => {
      state = form(undefined, actions.addField(textField));
      firstFieldAdded = Object.keys(state.schema.properties)[0];
    });

    describe("Empty form", () => {
      describe("schema", () => {
        it("should add a new field to the form schema", () => {
          expect(Object.keys(state.schema.properties))
            .to.have.length.of(1);
        });

        it("should generate a sluggified name for the added field", () => {
          expect(firstFieldAdded)
            .to.match(/^question_\d+/);
        });

        it("should assign the expected title to added field", () => {
          const fieldSchema = state.schema.properties[firstFieldAdded];

          expect(fieldSchema.title).eql("Question 1");
        });

        it("should assign the expected type to added field", () => {
          const fieldSchema = state.schema.properties[firstFieldAdded];

          expect(fieldSchema.type).eql("string");
        });
      });

      describe("uiSchema", () => {
        it("should have an entry for added field", () => {
          expect(state.uiSchema)
            .to.have.property(firstFieldAdded);
        });

        it("should provide an editSchema", () => {
          expect(state.uiSchema[firstFieldAdded].editSchema)
            .eql(textField.uiSchema.editSchema);
        });

        it("should initialize field order list", () => {
          expect(state.uiSchema["ui:order"])
            .eql([firstFieldAdded]);
        });
      });
    });

    describe("Existing form", () => {
      var newState, secondFieldAdded;

      beforeEach(() => {
        newState = form(state, actions.addField(multilineTextField));
        secondFieldAdded = Object.keys(newState.schema.properties)[1];
      });

      describe("schema", () => {
        it("should add a second field to the form schema", () => {
          expect(Object.keys(newState.schema.properties))
            .to.have.length.of(2);
        });

        it("should generate a sluggified name for the second field", () => {
          expect(secondFieldAdded)
            .to.match(/^question_\d+/);
        });
      });

      describe("uiSchema", () => {
        it("should have an entry for the newly added field", () => {
          expect(newState.uiSchema)
            .to.have.property(secondFieldAdded);
        });

        it("should provide an editSchema", () => {
          expect(newState.uiSchema[firstFieldAdded].editSchema)
            .eql(multilineTextField.uiSchema.editSchema);
        });

        it("should update the field order list", () => {
          expect(newState.uiSchema["ui:order"])
            .eql([firstFieldAdded, secondFieldAdded]);
        });
      });
    });
  });

  describe("FIELD_REMOVE action", () => {
    var state, firstFieldAdded;

    beforeEach(() => {
      state = form(undefined, actions.addField(textField));
      firstFieldAdded = Object.keys(state.schema.properties)[0];
    });

    it("should keep current index", () => {
      const previousIndex = state.currentIndex;
      expect(form(state, actions.removeField(firstFieldAdded)).currentIndex)
        .eql(previousIndex);
    });

    describe("Multiple items", () => {
      var removedState;

      beforeEach(() => {
        const intState = form(state, actions.addField(textField));
        const secondField = Object.keys(intState.schema.properties)[1];
        const secondFieldSchema = intState.schema.properties[secondField];
        const requiredState = form(intState, actions.updateField(
          secondField, secondFieldSchema, true, secondFieldSchema.title));
        removedState = form(requiredState,
          actions.removeField(secondField));
      });

      it("should remove a field from the required fields list", () => {
        expect(removedState.schema.required)
          .to.be.a("undefined");
      });

      it("should remove a field from the uiSchema order list", () => {
        expect(removedState.uiSchema["ui:order"])
          .eql([firstFieldAdded]);
      });
    });
  });

  describe("FIELD_UPDATE action", () => {
    var state, firstFieldAdded;

    const newSchema = {
      type: "string",
      title: "updated title",
      description: "updated description"
    };

    beforeEach(() => {
      state = form(undefined, actions.addField(textField));
      firstFieldAdded = Object.keys(state.schema.properties)[0];
    });

    it("should update the form schema with the updated one", () => {
      const action = actions.updateField(firstFieldAdded, newSchema, false,
        firstFieldAdded);

      expect(form(state, action).schema.properties[firstFieldAdded])
        .eql(newSchema);
    });

    it("should mark a field as required", () => {
      const action = actions.updateField(firstFieldAdded, newSchema, true,
        firstFieldAdded);

      expect(form(state, action).schema.required)
        .eql([firstFieldAdded]);
    });

    it("shouldn't touch uiSchema order", () => {
      const action = actions.updateField(firstFieldAdded, newSchema, false,
        firstFieldAdded);

      expect(form(state, action).uiSchema["ui:order"])
        .eql(state.uiSchema["ui:order"]);
    });

    describe("Successful Renaming", () => {
      const newFieldName = "renamed";
      var renamedState;

      beforeEach(() => {
        const action = actions.updateField(
          firstFieldAdded, newSchema, true, newFieldName);
        renamedState = form(state, action);
      });

      it("should expose new field name", () => {
        expect(renamedState.schema.properties[newFieldName])
          .eql(newSchema);
      });

      it("should discard previous name", () => {
        expect(renamedState.schema.properties[firstFieldAdded])
          .to.be.a("undefined");
      });

      it("should update required fields list", () => {
        expect(renamedState.schema.required)
          .eql([newFieldName]);
      });

      it("should update uiSchema order", () => {
        expect(renamedState.uiSchema["ui:order"])
          .eql([newFieldName]);
      });
    });

    describe("Failed Renaming", () => {
      var secondFieldAdded;

      beforeEach(() => {
        state = form(state, actions.addField(multilineTextField));
        secondFieldAdded = Object.keys(state.schema.properties)[1];
      });

      it("should notify renaming conflicts with an error", () => {
        state = form(state, actions.updateField(secondFieldAdded,
          state.schema.properties[secondFieldAdded], false, firstFieldAdded));

        expect(state.error)
          .eql(`Duplicate field name "${firstFieldAdded}", operation aborted.`);
      });
    });
  });

  describe("FIELD_INSERT action", () => {
    var state, firstField, secondField, insertedField;

    beforeEach(() => {
      state = form(undefined, actions.addField(textField));
      state = form(state, actions.addField(multilineTextField));
      firstField = Object.keys(state.schema.properties)[0];
      secondField = Object.keys(state.schema.properties)[1];
      state = form(state, actions.insertField(radioButtonField, secondField));
      insertedField = Object.keys(state.schema.properties)[2];
    });

    it("should insert the new field at the desired position", () => {
      expect(state.uiSchema["ui:order"])
        .eql([firstField, insertedField, secondField]);
    });
  });

  describe("FIELD_SWAP action", () => {
    var state, firstField, secondField;

    beforeEach(() => {
      state = form(undefined, actions.addField(textField));
      state = form(state, actions.addField(multilineTextField));
      firstField = Object.keys(state.schema.properties)[0];
      secondField = Object.keys(state.schema.properties)[1];
      state = form(state, actions.swapFields(secondField, firstField));
    });

    it("should swap two fields", () => {
      expect(state.uiSchema["ui:order"])
        .eql([secondField, firstField]);
    });
  });

  describe("FORM_RESET action", () => {
    it("should reset the form", () => {
      const initialState = form(undefined, {type: null});
      var state = form(undefined, actions.addField(textField));
      state = form(state, actions.resetForm(() => {
        expect(state).eql(initialState);
      }));

    });
  });

  describe("FORM_UPDATE_TITLE action", () => {
    it("should update form properties", () => {
      const state = form(undefined, actions.updateFormTitle({title: "title"}));
      expect(state.schema.title).eql("title");
    });
  });

  describe("FORM_UPDATE_DESCRIPTION action", () => {
    it("should update form properties", () => {
      const state = form(undefined, actions.updateFormDescription({description: "description"}));
      expect(state.schema.description).eql("description");
    });
  });
});
