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
    }
  ]
};
