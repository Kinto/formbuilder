import { connect } from "react-redux";

import UserForm from "../components/UserForm";


function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
  };
}

export default connect(
  mapStateToProps,
)(UserForm);
