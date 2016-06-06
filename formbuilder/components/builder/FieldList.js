import React from "react";
import { Link } from "react-router";
import { Draggable } from "react-drag-and-drop";


function MenuSection(props) {
  const {heading, fields} = props;

  const onDragStart = () => {
    props.setDragStatus(true);
  };
  const onDragEnd = () => {
    props.setDragStatus(false);
  };
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{heading}</div>
      <div className="list-group">{
        fields.map((field, index) => {
          return (
            <Draggable key={index} type="field"
              onClick={_ => props.onClick(field)}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
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
  const {fieldList, addField, schema} = props;
  var actionFields;
  if (Object.keys(schema.properties).length > 0) {
    actionFields = (
      <div className="list-group">
        <Link to="/builder/json" className="list-group-item">
          <i className="glyphicon glyphicon-fullscreen" />&nbsp;
          Show as JSON
        </Link>
        <button type="button"
          onClick={() => confirm("Are you sure?") && props.resetForm()}
          className="list-group-item">
          <i className="glyphicon glyphicon-remove" />&nbsp;
          Reset form
        </button>
      </div>
    );
  }
  return (
    <div>
      <MenuSection heading="Widgets"
        fields={fieldList}
        onClick={addField}
        setDragStatus={props.setDragStatus} />
      {actionFields}
    </div>
  );
}
