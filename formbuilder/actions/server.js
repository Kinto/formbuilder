import KintoAPI from "kinto-client";
import {addNotification} from "./notifications";

export const FORM_PUBLISH = "FORM_PUBLISH";
export const FORM_PUBLICATION_PENDING = "FORM_PUBLICATION_PENDING";
export const FORM_PUBLICATION_DONE = "FORM_PUBLICATION_DONE";


const api = new KintoAPI(
  "https://kinto.dev.mozaws.net/v1",
  { headers: {Authorization: "Basic " + btoa("token:formbuilder")} }
);

export function publishForm(redirect) {
  return (dispatch, getState) => {
    const {schema} = getState();
    // XXX Add permissions.
    dispatch({type: FORM_PUBLICATION_PENDING});
    api.createCollection({data: {schema}})
    .then(({data}) => {
      dispatch({
        type: FORM_PUBLICATION_DONE,
        collectionID: data.id
      });
      console.log("hop, published");
      redirect();
    })
    .catch((error) => {
      console.log(error);
      dispatch(addNotification({type: "error", message: error}));
    });
  };
}
