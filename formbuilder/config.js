export default {
  fieldList: [
    {
      id: "text",
      icon: "text-color",
      label: "Single line text",
      jsonSchema: {
        type: "string",
        title: "Edit me",
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
        title: "Edit me",
        default: ""
      },
      uiSchema: {
        widget: "textarea",
      },
      formData: {}
    },
    {
      id: "checkbox",
      icon: "check",
      label: "CheckBox",
      jsonSchema: {
        type: "boolean",
        title: "Edit me",
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
        title: "Edit me",
        default: false
      },
      uiSchema: {
        widget: "radio",
      },
      formData: {}
    },
    {
      id: "selectbox",
      icon: "list-alt",
      label: "Select box",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: []
      },
      uiSchema: {
      },
      formData: {}
    },
    {
      id: "number",
      icon: "superscript",
      label: "Number",
      jsonSchema: {
        type: "number",
        title: "Edit me",
        default: 0
      },
      uiSchema: {
        widget: "updown"
      },
      formData: {}
    },
    {
      id: "range",
      icon: "resize-horizontal",
      label: "Range",
      jsonSchema: {
        type: "number",
        title: "Edit me",
        default: 0
      },
      uiSchema: {
        widget: "range"
      },
      formData: {}
    }
  ]
};
