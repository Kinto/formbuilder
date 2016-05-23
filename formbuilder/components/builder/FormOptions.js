import React from "react";
import Form from "react-jsonschema-form";


const schema = {
  type: "object",
  title: "Form properties",
  properties: {
    title: {
      type: "string",
      title: "Form title"
    },
    description: {
      type: "string",
      title: "Form description"
    }
  }
};

const uiSchema = {
  description: {
    "ui:widget": "textarea"
  }
};

export default function FormOptions(props) {
  const update = function({formData}) {
    props.updateFormProperties(formData);
    props.history.pushState(null, "/builder");
  };

  const formData = {
    title: props.schema.title,
    description: props.schema.description,
  };

  return (
    <div>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={update} />
    </div>
  );
}
