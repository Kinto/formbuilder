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
              onDoubleClick={_ => props.onDoubleClick(field)}
              data={JSON.stringify(field)}
              className="list-group-item field-list-entry">
              <i className={`glyphicon glyphicon-${field.icon}`} />
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
        onDoubleClick={addField} />
      <MenuSection heading="Fieldsets"
        fields={fieldSets}
        onDoubleClick={addField} />
      <div className="list-group">
        <Link to="/settings" className="list-group-item">
          <i className="glyphicon glyphicon-wrench" />
          Edit form properties
        </Link>
        <Link to="/json" className="list-group-item">
          <i className="glyphicon glyphicon-fullscreen" />
          Show as JSON
        </Link>
      </div>
    </div>
  );
}


