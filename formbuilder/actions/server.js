import KintoAPI from "kinto-client";
import btoa from "btoa";

import {addNotification} from "./notifications";
import config from "../config";

export const FORM_PUBLISH = "FORM_PUBLISH";
export const FORM_PUBLICATION_PENDING = "FORM_PUBLICATION_PENDING";
export const FORM_PUBLICATION_DONE = "FORM_PUBLICATION_DONE";
export const FORM_PUBLICATION_FAILED = "FORM_PUBLICATION_DONE";

export const FORM_RECORD_CREATION_PENDING = "FORM_RECORD_CREATION_PENDING";
export const FORM_RECORD_CREATION_DONE = "FORM_RECORD_CREATION_DONE";
export const SCHEMA_RETRIEVAL_PENDING = "SCHEMA_RETRIEVAL_PENDING";
export const SCHEMA_RETRIEVAL_DONE = "SCHEMA_RETRIEVAL_DONE";
export const RECORDS_RETRIEVAL_PENDING = "RECORDS_RETRIEVAL_PENDING";
export const RECORDS_RETRIEVAL_DONE = "RECORDS_RETRIEVAL_DONE";

const CONNECTIVITY_ISSUES = "This is probably due to an unresponsive server or some connectivity issues.";

export const api = new KintoAPI(
  config.server.remote,
  { headers: {Authorization: "Basic " + btoa(config.server.auth)} }
);

export function publishForm(callback) {
  return (dispatch, getState) => {
    const form = getState().form;
    const schema = form.schema;
    const uiSchema = form.uiSchema;
    // XXX Add permissions.
    dispatch({type: FORM_PUBLICATION_PENDING});
    api.createCollection({data: {schema, uiSchema}})
    .then(({data}) => {
      dispatch({
        type: FORM_PUBLICATION_DONE,
        collectionID: data.id
      });
      if (callback) {
        callback(data.id);
      }
    })
    .catch((error) => {
      const msg = "We were unable to publish your form. " +
                  CONNECTIVITY_ISSUES;
      dispatch(addNotification(msg, {type: "error"}));
      dispatch({type: FORM_PUBLICATION_FAILED});
    });
  };
}

export function submitRecord(record, collectionID, callback) {
  return (dispatch, getState) => {
    dispatch({type: FORM_RECORD_CREATION_PENDING});
    api.createRecord(collectionID, record)
    .then(({data}) => {
      dispatch({
        type: FORM_RECORD_CREATION_DONE,
      });
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      const msg = "We were unable to publish your answers. " +
                  CONNECTIVITY_ISSUES;
      dispatch(addNotification(msg, {type: "error"}));
    });
  };
}

export function loadSchema(collectionID, callback) {
  return (dispatch, getState) => {
    dispatch({type: SCHEMA_RETRIEVAL_PENDING});
    api.getCollection(collectionID)
    .then(({data}) => {
      dispatch({
        type: SCHEMA_RETRIEVAL_DONE,
        data: data
      });
      if (callback) {
        callback(data);
      }
    })
    .catch((error) => {
      const msg = "Due to a network error, we were unable to load your form. " +
                  CONNECTIVITY_ISSUES;
      dispatch(addNotification(msg, {type: "error"}));
    });
  };
}

export function getRecords(collectionID, callback) {
  return (dispatch, getState) => {
    dispatch({type: RECORDS_RETRIEVAL_PENDING});
    api.getRecords(collectionID)
    .then(({data}) => {
      dispatch({
        type: RECORDS_RETRIEVAL_DONE,
        records: data
      });
      if (callback) {
        callback(data);
      }
    })
    .catch((error) => {
      const msg = "We were unable to retrieve the list of records for your form. " +
                  CONNECTIVITY_ISSUES;
      dispatch(addNotification(msg, {type: "error"}));
    });
  };
}
