import React from "react";
import { Link } from "react-router";
import { Draggable } from "react-drag-and-drop";


export default function FieldList(props) {
  return (
    <div>
      <div className="list-group">
        {
          props.fieldList.map((field, index) => {
            return (
              <Draggable key={index} type="field"
                data={JSON.stringify(field)}
                className="list-group-item field-list-entry">
                <div>
                  <i className={`glyphicon glyphicon-${field.icon}`} />
                  {" " + field.label}
                </div>
              </Draggable>
            );
          })
        }
      </div>
      <div className="list-group">
        <Link to="/settings" className="list-group-item">
          <i className="glyphicon glyphicon-wrench" />
          {" Edit form properties"}
        </Link>
        <Link to="/json" className="list-group-item">
          <i className="glyphicon glyphicon-fullscreen" />
          {" Show as JSON"}
        </Link>
      </div>
    </div>
  );
}


