/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";

import {
  api,
  publishForm,
  FORM_PUBLICATION_PENDING,
  FORM_PUBLICATION_DONE
} from "../../formbuilder/actions/server";

import {
  NOTIFICATION_ADD
} from "../../formbuilder/actions/notifications";


describe("server actions", () => {
  let sandbox;
  let dispatch;
  let getState;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    dispatch = sandbox.stub();
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
      beforeEach(() => {
        sandbox.stub(api, "createCollection", () => {
          return Promise.resolve({data: {id: "collectionID"}});
        });
      });

      it("should call the redirect function after a successful request", (done) => {
        publishForm((id) => {
          try {
            expect(id).to.eql("collectionID");
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
              collectionID: "collectionID"
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
        dispatch = (payload) => {
          if (payload.type == NOTIFICATION_ADD) {
            try {
              expect(payload.notification.type).to.eql("error");
              expect(payload.notification.message.message).to.eql("error message");
              done();
            } catch(e) {
              return done(e);
            }
          }
        };
        publishForm(() => {
          done(new Error("Redirect shouldn't be called!"));
        })(dispatch, getState);
      });
    });
  });
});
