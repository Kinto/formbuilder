import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FieldList from "../../components/builder/FieldList";
import * as FieldListActions from "../../actions/fieldlist";
import config from "../../config";

function mapStateToProps(state) {
  return {
    fieldList: config.fieldList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FieldListActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldList);
