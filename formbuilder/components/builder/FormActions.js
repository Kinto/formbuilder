import React from "react";
import FieldListDropdown from "./FieldListDropdown";
import {Button, ButtonToolbar, ButtonGroup}  from "react-bootstrap";

export default function FormActions(props) {
  const onClick = (event) => {
    props.publishForm(({collection, adminToken}) => {
      props.history.pushState(null, `/builder/published/${adminToken}`);
    });
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
        <FieldListDropdown className="pull-right" {...props}>
          <i className="glyphicon glyphicon-plus" />
          Add a field
        </FieldListDropdown>
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
