import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import FormOptionsMenu from "../components/FormOptionsMenu";
import * as FormOptionsActions from "../actions/formOptions";


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FormOptionsActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormOptionsMenu);
