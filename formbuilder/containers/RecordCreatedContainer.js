import { connect } from "react-redux";

import RecordCreated from "../components/RecordCreated";


function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
  };
}

export default connect(
  mapStateToProps,
)(RecordCreated);
