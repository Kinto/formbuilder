import React from "react";
import { Link } from "react-router";
import AddFieldDropdown from "./AddFieldDropdown"
import {Button, ButtonToolbar, ButtonGroup}  from "react-bootstrap"

export default function FormActions(props) {
  // const {properties} = props.schema;
  const onClick = (event) => {
    props.publishForm(({collection, adminToken}) => {
      props.history.pushState(null, `/builder/published/${adminToken}`);
    });
  };
  const actionDescription = {
    reset: "Reset the form",
    showJson: "Show form as json",
    save: "Save your form"
  };

  let saveIconName;
  if (props.status == "pending") {
    saveIconName = "refresh spin";
  } else {
    saveIconName = "save";
  }

  return (
    <div>
      <ButtonToolbar className="builder-inner-actions">
        <AddFieldDropdown className="pull-right" {...props} />
      </ButtonToolbar>
      <ButtonGroup className="pull-right">
        <Button onClick={() => confirm("This action will reset all unsaved changes, Are you sure?") && props.resetForm()}>
          <i className="glyphicon glyphicon-remove" />
          Reset <span className="hidden-xs">form</span>
        </Button>
        <Button bsStyle="success" onClick={onClick}>
          <i className={`glyphicon glyphicon-${saveIconName}`} />
          Save your form
        </Button>
      </ButtonGroup>
    </div>
  );
}
