import { connect } from "react-redux";

import FormOptions from "../../components/builder/JsonView";


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
