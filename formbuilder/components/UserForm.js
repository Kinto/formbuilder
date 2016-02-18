import React from "react";
import Form from "react-jsonschema-form";

export default function UserForm(props) {
  return <Form schema={props.schema} uiSchema={props.uiSchema} />;
}
