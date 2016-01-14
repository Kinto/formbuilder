import countries from "./data/countries";


export default {
  fieldList: [
    {
      id: "text",
      icon: "text-color",
      label: "Single line text",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        description: "",
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
        description: "",
        default: ""
      },
      uiSchema: {
        "ui:widget": "textarea",
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
        "ui:widget": "radio",
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
      id: "radiobuttonlist",
      icon: "list",
      label: "Radio Button list",
      jsonSchema: {
        type: "string",
        title: "Edit me",
        enum: ["option 1", "option 2", "option 3"],
      },
      uiSchema: {
        "ui:widget": "radio",
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
        description: "",
        multipleOf: 1,
        minimum: 1,
        maximum: 100,
        default: 0
      },
      uiSchema: {
        "ui:widget": "updown",
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
        multipleOf: 1,
        minimum: 1,
        maximum: 100,
        default: 0
      },
      uiSchema: {
        "ui:widget": "range",
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
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
      id: "address",
      icon: "leaf",
      label: "Postal address",
      jsonSchema: {
        type: "object",
        title: "",
        description: "",
        properties: {
          address1: {type: "string", title: "Address line 1"},
          address2: {type: "string", title: "Address line 2"},
          zip: {type: "string", title: "Zip code"},
          city: {type: "string", title: "City"},
          state: {type: "string", title: "State"},
          country: {type: "string", title: "Country", enum: countries},
        }
      },
      uiSchema: {
        editSchema: {
          type: "object",
          properties: {
            name: {type: "string", title: "Field name"},
            title: {type: "string", title: "Label"},
            description: {type: "string", title: "Description"},
            required: {type: "boolean"},
          }
        },
      },
      formData: {}
    }
  ],
  fieldSets: [
    // {
    //   id: "address",
    //   icon: "leaf",
    //   label: "Postal address",
    //   jsonSchema: {
    //     type: "object",
    //     properties: {
    //       address1: {type: "string", title: "Address line 1"},
    //       address2: {type: "string", title: "Address line 2"},
    //       zip: {type: "string", title: "Zip code"},
    //       city: {type: "string", title: "City"},
    //       state: {type: "string", title: "State"},
    //       country: {type: "string", title: "Country", enum: countries},
    //     }
    //   },
    //   uiSchema: {
    //     editSchema: {
    //       type: "object",
    //       properties: {
    //         name: {type: "string", title: "Field name"},
    //         title: {type: "string", title: "Label"},
    //         required: {type: "boolean"},
    //       }
    //     }
    //   },
    //   formData: {}
    // }
  ]
};
