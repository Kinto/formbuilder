import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";

import * as FieldListActions from "../actions/fieldlist";
import EditableField from "../components/EditableField";
import Default from "../components/Default";


function mapStateToProps(state) {
  return {
    schema: state.form.schema,
    uiSchema: state.form.uiSchema,
    formData: state.form.formData,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators(FieldListActions, dispatch);
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

const SchemaFieldWrapper = (props) => {
  if (Object.keys(props.schema.properties).length === 0) {
    return <Default />;
  }
  return (
    <div className="rjsf">
      <SchemaField {...props} />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SchemaFieldWrapper);
