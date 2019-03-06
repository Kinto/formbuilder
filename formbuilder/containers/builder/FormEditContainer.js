import { connect } from "react-redux";

import FormEdit from "./FormEdit";
import { bindActionCreators } from "redux";
import * as ServerActions from "../../actions/server";


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServerActions, dispatch);
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormEdit);
