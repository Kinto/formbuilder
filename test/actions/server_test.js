/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";

import {
  publishForm,
  submitRecord,
  loadSchema,
  getRecords,
  FORM_PUBLICATION_PENDING,
  FORM_PUBLICATION_DONE,
  FORM_RECORD_CREATION_PENDING,
  FORM_RECORD_CREATION_DONE,
  SCHEMA_RETRIEVAL_PENDING,
  SCHEMA_RETRIEVAL_DONE,
  RECORDS_RETRIEVAL_PENDING,
  RECORDS_RETRIEVAL_DONE
} from "../../formbuilder/actions/server";

import {
  NOTIFICATION_ADD
} from "../../formbuilder/actions/notifications";

function getErrorDispatch(done) {
  return (func) => {
    if (typeof func !== "function") {
      return;
    }
    func((payload) => {
      if (payload.type == NOTIFICATION_ADD) {
        try {
          expect(payload.notification.type).to.eql("error");
          done();
        } catch(e) {
          return done(e);
        }
      }
    });
  };
}

describe.only("server actions", () => {
  let sandbox;
  let dispatch;
  let getState;
  let record;
  let collection;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    dispatch = sandbox.stub();
    collection: "mycoll";
    record = {id: 1234, collection: collection};

    getState = () => {
      return {
        form: {
          schema: "shema",
          uiSchema: "uiSchema"
        }
      };
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("publishForm", () => {
    describe("with working remote server", () => {
      let data;
      beforeEach(() => {
        data = {id: "collection"};
        sandbox.stub(api, "createCollection", () => {
          return Promise.resolve({data});
        });
      });

      it("should call the redirect function after a successful request", (done) => {
        publishForm((id) => {
          try {
            expect(id).to.eql(data.id);
            done();
          } catch(e) {
            done(e);
          }
        })(dispatch, getState);
      });

      it("should call the dispatch function twice", (done) => {
        publishForm(() => {
          try {
            sinon.assert.calledWithExactly(dispatch, {
              type: FORM_PUBLICATION_PENDING
            });
            sinon.assert.calledWithExactly(dispatch, {
              type: FORM_PUBLICATION_DONE,
              collection: data.id
            });
            done();
          } catch(err) {
            return done(err);
          }
        })(dispatch, getState);
      });
    });

    describe("with erroring remote server", () => {
      beforeEach(() => {
        sandbox.stub(api, "createCollection", () => {
          return Promise.reject(new Error("error message"));
        });
      });
      it("should dispatch an error if an http error occurs", (done) => {
        dispatch = getErrorDispatch(done);
        publishForm(() => {
          done(new Error("Redirect shouldn't be called!"));
        })(dispatch, getState);
      });
    });
  });


  describe("submitRecord", () => {
    describe("with working remote server", () => {
      let data;
      beforeEach(() => {
        data = {id: record.id};
        sandbox.stub(api, "createRecord", () => {
          return Promise.resolve({data});
        });
      });

      it("should call the redirect function after a successful request", (done) => {
        submitRecord(record, collection, done)(dispatch, getState);
      });

      it("should call the dispatch function twice", (done) => {
        submitRecord(record, collection, () => {
          try {
            sinon.assert.calledWithExactly(dispatch, {
              type: FORM_RECORD_CREATION_PENDING
            });
            sinon.assert.calledWithExactly(dispatch, {
              type: FORM_RECORD_CREATION_DONE
            });
            done();
          } catch(err) {
            return done(err);
          }
        })(dispatch, getState);
      });
    });

    describe("with erroring remote server", () => {
      beforeEach(() => {
        sandbox.stub(api, "createRecord", () => {
          return Promise.reject(new Error("error message"));
        });
      });
      it("should dispatch an error if an http error occurs", (done) => {
        dispatch = getErrorDispatch(done);
        submitRecord(() => {
          done(new Error("Redirect shouldn't be called!"));
        })(dispatch, getState);
      });
    });
  });


  describe("loadSchema", () => {
    describe("with working remote server", () => {
      let data;
      beforeEach(() => {
        data = {id: "collection"};
        sandbox.stub(api, "getCollection", () => {
          return Promise.resolve({data});
        });
      });

      it("should call the redirect function after a successful request", (done) => {
        loadSchema(collection, (schema) => {
          try {
            expect(schema.id).to.eql(data.id);
            done();
          } catch(e) {
            done(e);
          }
        })(dispatch, getState);
      });

      it("should call the dispatch function twice", (done) => {
        loadSchema(collection, () => {
          try {
            sinon.assert.calledWithExactly(dispatch, {
              type: SCHEMA_RETRIEVAL_PENDING
            });
            sinon.assert.calledWithExactly(dispatch, {
              type: SCHEMA_RETRIEVAL_DONE,
              data: data
            });
            done();
          } catch(err) {
            return done(err);
          }
        })(dispatch, getState);
      });
    });

    describe("with erroring remote server", () => {
      beforeEach(() => {
        sandbox.stub(api, "getCollection", () => {
          return Promise.reject(new Error("error message"));
        });
      });
      it("should dispatch an error if an http error occurs", (done) => {
        dispatch = getErrorDispatch(done);
        loadSchema(collection, () => {
          done(new Error("Redirect shouldn't be called!"));
        })(dispatch, getState);
      });
    });
  });

  describe("getRecords", () => {
    describe("with working remote server", () => {
      let records;
      beforeEach(() => {
        records = [{id: "1"}, {id: "2"}];
        sandbox.stub(api, "getRecords", () => {
          return Promise.resolve({data: records});
        });
      });

      it("should call the redirect function after a successful request", (done) => {
        getRecords(collection, (retrieved) => {
          try {
            expect(retrieved).to.eql(records);
            done();
          } catch(e) {
            done(e);
          }
        })(dispatch, getState);
      });

      it("should call the dispatch function twice", (done) => {
        getRecords(collection, () => {
          try {
            sinon.assert.calledWithExactly(dispatch, {
              type: RECORDS_RETRIEVAL_PENDING
            });
            sinon.assert.calledWithExactly(dispatch, {
              type: RECORDS_RETRIEVAL_DONE,
              records: records
            });
            done();
          } catch(err) {
            return done(err);
          }
        })(dispatch, getState);
      });
    });

    describe("with erroring remote server", () => {
      beforeEach(() => {
        sandbox.stub(api, "getRecords", () => {
          return Promise.reject(new Error("error message"));
        });
      });
      it("should dispatch an error if an http error occurs", (done) => {
        dispatch = getErrorDispatch(done);
        getRecords(() => {
          done(new Error("Redirect shouldn't be called!"));
        })(dispatch, getState);
      });
    });
  });
});
