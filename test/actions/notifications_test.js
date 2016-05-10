/*eslint no-unused-vars: [2, { "varsIgnorePattern": "^d$" }]*/

import { expect } from "chai";
import sinon from "sinon";

import {
  NOTIFICATION_ADD,
  addNotification
} from "../../formbuilder/actions/notifications";

describe("notifications actions", () => {
  let sandbox;
  let dispatch;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    dispatch = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("addNotification", () => {
    it("should send info notifications by default", (done) => {
      addNotification("Some info message")(({type, notification}) => {
        expect(type).to.eql(NOTIFICATION_ADD);
        expect(notification.message).to.eql("Some info message");
        expect(notification.type).to.eql("info");
        done();
      });
    });

    it("should send error notifications if specified", (done) => {
      const thunk = addNotification("Some error message", {type: "error"});
      thunk(({type, notification}) => {
        expect(type).to.eql(NOTIFICATION_ADD);
        expect(notification.message).to.eql("Some error message");
        expect(notification.type).to.eql("error");
        done();
      });
    });
    describe("With fake timers", () => {
      beforeEach(() => {
        sandbox.useFakeTimers();
      });

      it("should dismiss a message after a specific time", () => {
        addNotification("Some dismissable message", {
          type: "info",
          autoDismiss: true,
          dismissAfter: 2
        })(dispatch);
        sinon.assert.calledWithMatch(dispatch, {
          type: "NOTIFICATION_ADD",
          notification: {
            id: sinon.match.string,
            message: "Some dismissable message",
            type: "info"
          }
        });
        sandbox.clock.tick(3);
        sinon.assert.calledWithMatch(dispatch, {
          type: "NOTIFICATION_REMOVE",
          id: sinon.match.string
        });
      });

      it("should not dismiss an undismissable message", () => {
        addNotification("Some dismissable message", {
          type: "info",
          autoDismiss: false,
          dismissAfter: 2
        })(dispatch);
        sinon.assert.calledWithMatch(dispatch, {
          type: "NOTIFICATION_ADD",
          notification: {
            id: sinon.match.string,
            message: "Some dismissable message",
            type: "info"
          }
        });
        sandbox.clock.tick(3);
        expect(dispatch.calledOnce).to.be.true;
      });

      it("should dismiss messages by default", () => {
        addNotification("Some dismissable message")(dispatch);
        sinon.assert.calledWithMatch(dispatch, {
          type: "NOTIFICATION_ADD",
          notification: {
            id: sinon.match.string,
            message: "Some dismissable message",
            type: "info"
          }
        });
        sandbox.clock.tick(6000);
        sinon.assert.calledWithMatch(dispatch, {
          type: "NOTIFICATION_REMOVE",
          id: sinon.match.string
        });
      });
    });
  });
});
