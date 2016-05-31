import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FieldList from "../../components/builder/FieldList";
import * as FieldListActions from "../../actions/fieldlist";
import * as DragnDropActions from "../../actions/dragndrop";
import config from "../../config";

function mapStateToProps(state) {
  return {
    fieldList: config.fieldList,
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {...FieldListActions, ...DragnDropActions};
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldList);
