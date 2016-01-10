import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import FormOptions from "../components/FormOptions";
import * as FieldListActions from "../actions/fieldlist";


function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FieldListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormOptions);
