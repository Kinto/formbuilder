import { connect } from "react-redux";

import FormOptions from "../components/JsonView";


function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
  };
}

export default connect(
  mapStateToProps,
)(FormOptions);
