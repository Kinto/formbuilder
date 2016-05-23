import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Welcome from "../components/Welcome";
import * as FieldListActions from "../actions/fieldlist";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FieldListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
