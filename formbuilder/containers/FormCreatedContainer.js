import { connect } from "react-redux";

import FormCreated from "../components/FormCreated";


function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
    publicationStatus: state.publicationStatus
  };
}

export default connect(
  mapStateToProps,
)(FormCreated);
