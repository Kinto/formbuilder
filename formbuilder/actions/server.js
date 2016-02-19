import KintoAPI from "kinto-client";
import {addNotification} from "./notifications";

export const FORM_PUBLISH = "FORM_PUBLISH";
export const FORM_PUBLICATION_PENDING = "FORM_PUBLICATION_PENDING";
export const FORM_PUBLICATION_DONE = "FORM_PUBLICATION_DONE";
export const FORM_RECORD_PENDING = "FORM_RECORD_PENDING";
export const FORM_RECORD_DONE = "FORM_RECORD_DONE";

const api = new KintoAPI(
  "http://localhost:8888/v1",
  { headers: {Authorization: "Basic " + btoa("token:formbuilder")} }
);

export function publishForm(redirect) {
  return (dispatch, getState) => {
    const schema = getState().form.schema;
    // XXX Add permissions.
    dispatch({type: FORM_PUBLICATION_PENDING});
    api.createCollection({data: {schema}})
    .then(({data}) => {
      dispatch({
        type: FORM_PUBLICATION_DONE,
        collectionID: data.id
      });
      redirect();
    })
    .catch((error) => {
      console.log(error);
      dispatch(addNotification({type: "error", message: error}));
    });
  };
}

export function submitRecord(record, collectionID, redirect) {
  return (dispatch, getState) => {
    // XXX Add permissions.
    dispatch({type: FORM_RECORD_PENDING});
    console.log("youpi");
    api.createRecord(collectionID, record)
    .then(({data}) => {
      dispatch({
        type: FORM_RECORD_DONE,
      });
      console.log("hop, new item added");
      if (redirect) {
        redirect();
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(addNotification({type: "error", message: error}));
    });
  };
}
