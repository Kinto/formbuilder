import React from "react";
import { Link } from "react-router";
import { Draggable } from "react-drag-and-drop";


function MenuSection(props) {
  const {heading, fields} = props;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{heading}</div>
      <div className="list-group">{
        fields.map((field, index) => {
          return (
            <Draggable key={index} type="field"
              onClick={_ => props.onClick(field)}
              data={JSON.stringify(field)}
              className="list-group-item field-list-entry">
              <i className={`glyphicon glyphicon-${field.icon}`} />&nbsp;
              <span>{field.label}</span>
            </Draggable>
          );
        })
      }</div>
    </div>
  );
}

export default function FieldList(props) {
  const {fieldList, fieldSets, addField} = props;
  return (
    <div>
      <MenuSection heading="Widgets"
        fields={fieldList}
        onClick={addField} />
      <MenuSection heading="Fieldsets"
        fields={fieldSets}
        onClick={addField} />
      <div className="list-group">
        <Link to="/builder/settings" className="list-group-item">
          <i className="glyphicon glyphicon-wrench" />&nbsp;
          Edit form properties
        </Link>
        <Link to="/builder/json" className="list-group-item">
          <i className="glyphicon glyphicon-fullscreen" />&nbsp;
          Show as JSON
        </Link>
        <button type="button"
          onClick={() => confirm("Are you sure?") && props.resetForm()}
          className="list-group-item list-group-item-danger">
          <i className="glyphicon glyphicon-remove" />&nbsp;
          Reset form
        </button>
      </div>
    </div>
  );
}
