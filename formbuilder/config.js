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
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Placeholder"},
            required: {type: "boolean"},
          }
        },
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
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Placeholder"},
            required: {type: "boolean"},
          }
        },
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
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
          }
        },
      },
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
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
          }
        },
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
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            required: {type: "boolean"},
            enum: {
              type: "array",
              title: "Options",
              items: {
                type: "string"
              }
            }
          }
        },
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
        widget: "updown",
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Placeholder"},
            multipleOf: {type: "number", title: "Step"},
            minimum: {type: "number", title: "Minimum"},
            maximum: {type: "number", title: "Maximum"},
            required: {type: "boolean"},
          }
        },
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
        widget: "range",
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Placeholder"},
            multipleOf: {type: "number", title: "Step"},
            minimum: {type: "number", title: "Minimum"},
            maximum: {type: "number", title: "Maximum"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    }
  ]
};
