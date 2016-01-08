import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";
import * as FieldListActions from "../actions/fieldlist";
import EditableField from "../components/EditableField";

function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(FieldListActions, dispatch);
  // Side effect: attaching action creators to EditableField, so they're
  // available within the Form fields hierarchy.
  EditableField.defaultProps = Object.assign(
    {}, EditableField.defaultProps || {}, actions);
  return actions;
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    SchemaField: EditableField,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form);
