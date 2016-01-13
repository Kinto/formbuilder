import React from "react";
import { Droppable } from "react-drag-and-drop";

import Default from "../components/Default";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";


export default function SchemaFieldWrapper(props) {
  const {properties} = props.schema;

  const onDrop = ({field}) => {
    props.addField(JSON.parse(field));
  };

  return (
    <div>
      <div>
        <div className="rjsf"><SchemaField {...props} /></div>
      </div>
      <Droppable types={["field"]} className="form-area" onDrop={onDrop}>
        {Object.keys(properties).length === 0 ?
          <Default /> : null}
      </Droppable>
    </div>
  );
}
