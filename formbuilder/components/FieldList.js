import React from "react";
import { Link } from "react-router";


export default function FieldList(props) {
  return (
    <div>
      <div className="list-group">
        {
          props.fieldList.map((field, index) => {
            return (
              <button key={index} type="button" className="list-group-item"
                onClick={props.addField.bind(null, field)}>
                <i className={`glyphicon glyphicon-${field.icon}`} />
                {" " + field.label}
              </button>
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


