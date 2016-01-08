export default {
  fieldList: [
    {
      id: "checkbox",
      icon: "check",
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
      icon: "record",
      label: "Radio Button",
      jsonSchema: {
        type: "boolean",
        title: "radio",
        default: false
      },
      uiSchema: {
        widget: "radio",
      },
      formData: {}
    },
    {
      id: "text",
      icon: "text-color",
      label: "Single line text",
      jsonSchema: {
        type: "string",
        title: "Text",
        default: ""
      },
      uiSchema: {
      },
      formData: {}
    },
    {
      id: "multilinetext",
      icon: "align-left",
      label: "Multiline text",
      jsonSchema: {
        type: "string",
        title: "Text",
        default: ""
      },
      uiSchema: {
        widget: "textarea",
      },
      formData: {}
    }
  ]
};
