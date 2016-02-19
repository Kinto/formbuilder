import React from "react";
import Form from "react-jsonschema-form";

export default function UserForm(props) {
  const onSubmit = ({formData}) => {
    console.log("submitted", formData);
    props.submitRecord(formData, props.params.id);
  };
  return <Form schema={props.schema} uiSchema={props.uiSchema}
               onSubmit={onSubmit}/>;
}
