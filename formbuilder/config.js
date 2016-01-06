export default {
  fieldList: [
    {
      id: "checkbox",
      icon: "checkbox",
      label: "CheckBox",
      jsonSchema: {
        type: "boolean",
        title: "checkbox",
        default: false,
      },
      uiSchema: {},
      formData: {}
    },
    {
      id: "radiobutton",
      icon: "radiobutton",
      label: "Radio Button",
      jsonSchema: {
        type: "boolean",
        title: "radio",
        default: false
      },
      uiSchema: {
        widget: "radio"
      },
      formData: {}
    },
    {
      id: "text",
      icon: "text",
      label: "Single line text field",
      jsonSchema: {
        type: "string",
        title: "Text",
        default: ""
      },
      uiSchema: {},
      formData: {}
    },
    {
      id: "multilinetext",
      icon: "multilinetext",
      label: "Multiline text field",
      jsonSchema: {
        type: "string",
        title: "Text",
        default: ""
      },
      uiSchema: {
        widget: "textarea"
      },
      formData: {}
    }
  ]
};
