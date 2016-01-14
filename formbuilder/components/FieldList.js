import React from "react";
import { Link } from "react-router";
import { Draggable } from "react-drag-and-drop";


function MenuSection(props) {
  const {heading, children} = props;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{heading}</div>
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export default function FieldList(props) {
  return (
    <div>
      <MenuSection heading="Widgets">{
        props.fieldList.map((field, index) => {
          return (
            <Draggable key={index} type="field"
              data={JSON.stringify(field)}
              className="list-group-item field-list-entry">
              <i className={`glyphicon glyphicon-${field.icon}`} />
              <span>{field.label}</span>
            </Draggable>
          );
        })
      }</MenuSection>
      <MenuSection heading="Fieldsets">{
        props.fieldSets.map((field, index) => {
          return (
            <li key={index} className="list-group-item">
              <Draggable type="field"
                data={JSON.stringify(field)}
                className="field-list-entry">
                <i className={`glyphicon glyphicon-${field.icon}`} />
                <span>{field.label}</span>
              </Draggable>
            </li>
          );
        })
      }</MenuSection>
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


