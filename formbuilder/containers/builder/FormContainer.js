import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as FieldListActions from "../../actions/fieldlist";
import * as ServerActions from "../../actions/server";

import Form from "../../components/builder/Form";
import EditableField from "../../components/builder/EditableField";


function mapStateToProps(state) {
  console.log(state);
  return {
    error: state.form.error,
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
    editionState: state.form.editionState,
    status: state.serverStatus.status,
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {...FieldListActions, ...ServerActions};
  const actions = bindActionCreators(actionCreators, dispatch);
  // Side effect: attaching action creators as EditableField props, so they're
  // available from within the Form fields hierarchy.
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
    onChange: () => {}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Form);
