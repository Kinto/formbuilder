import { connect } from "react-redux";
import Form from "react-jsonschema-form";

function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData
  };
}

export default connect(
  mapStateToProps,
)(Form);
