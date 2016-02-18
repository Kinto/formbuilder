import { connect } from "react-redux";

import PublishForm from "../components/PublishForm";


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
)(PublishForm);
