import React from "react";
import { Link } from "react-router";


function MenuSection(props) {
  const {heading, fields} = props;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">{heading}</div>
      <div className="list-group">{
        fields.map((field, index) => {
          return (
            <div key={index} type="field"
              onClick={_ => props.onClick(field)}
              data={JSON.stringify(field)}
              className="list-group-item field-list-entry">
              <i className={`glyphicon glyphicon-${field.icon}`} />
              <span>{field.label}</span>
            </div>
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
          <i className="glyphicon glyphicon-wrench" />
          Edit form properties
        </Link>
        <Link to="/builder/json" className="list-group-item">
          <i className="glyphicon glyphicon-fullscreen" />
          Show as JSON
        </Link>
        <button type="button"
          onClick={() => confirm("Are you sure?") && props.resetForm()}
          className="list-group-item list-group-item-danger">
          <i className="glyphicon glyphicon-remove" />
          Reset form
        </button>
      </div>
    </div>
  );
}
