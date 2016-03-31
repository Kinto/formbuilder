import React, { Component } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import Form from "react-jsonschema-form";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import { toIdSchema } from "react-jsonschema-form/lib/utils";
import slug from "slug";


function pickKeys(source, target) {
  const result = {};
  for (let key in source) {
    result[key] = target[key];
  }
  return result;
}

function shouldHandleDoubleClick(node) {
  // disable doubleclick on number input, so people can use inc/dec arrows
  if (node.tagName === "INPUT" &&
      node.getAttribute("type") === "number") {
    return false;
  }
  return true;
}

function isDefaultFieldName(name) {
  return /^field_\d{7}$/.test(name);
}

function slugify(string) {
  return slug(string, {mode: "rfc3986", replacement: "_"});
}

class FieldPropertiesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      editedSchema: props.schema,
      autoName: false,
    };
  }

  onChange({formData}) {
    if (this.state.autoName || isDefaultFieldName(formData.name)) {
      this.setState({
        editedSchema: formData,
        name: slugify(formData.title),
        autoName: true,
      });
    } else if (!this.state.autoName) {
      this.setState({
        editedSchema: formData,
        name: formData.name
      });
    } else {
      this.setState({
        editedSchema: formData,
        name: formData.name,
        autoName: false,
      });
    }
  }

  render() {
    const {schema, name, required, uiSchema, cancel, update} = this.props;
    const formData = {
      ...schema,
      required,
      ...this.state.editedSchema,
      name: this.state.name
    };
    return (
      <div className="panel panel-default field-editor">
        <div className="panel-heading">
          <strong>Edit {name}</strong>
          <button type="button" className="close-btn" onClick={cancel}>
            <i className="glyphicon glyphicon-remove-sign"/>
          </button>
        </div>
        <div className="panel-body">
          <Form
            schema={uiSchema.editSchema}
            formData={formData}
            onChange={this.onChange.bind(this)}
            onSubmit={update} />
        </div>
      </div>
    );
  }
}

function DraggableFieldContainer(props) {
  const {
    children,
    dragData,
    onEdit,
    onDelete,
    onDoubleClick,
    onDrop
  } = props;
  return (
    <Draggable type="moved-field" data={dragData}>
      <Droppable types={["field", "moved-field"]}
        onDrop={onDrop}>
        <div className="row editable-field" onDoubleClick={onDoubleClick}>
          <div className="col-sm-9">
            {children}
          </div>
          <div className="col-sm-3 editable-field-actions">
            <button type="button" className="edit-btn" onClick={onEdit}>
              <i className="glyphicon glyphicon-edit"/>
            </button>
            <button type="button" className="delete-btn" onClick={onDelete}>
              <i className="glyphicon glyphicon-remove-sign"/>
            </button>
          </div>
        </div>
      </Droppable>
    </Draggable>
  );
}

export default class EditableField extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false, schema: props.schema};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({edit: false, schema: nextProps.schema});
  }

  handleEdit(event) {
    event.preventDefault();
    if (shouldHandleDoubleClick(event.target)) {
      this.setState({edit: true});
    }
  }

  handleUpdate({formData}) {
    const updated = pickKeys(this.props.schema, formData);
    const schema = {...this.props.schema, ...updated};
    this.setState({edit: false, schema});
    this.props.updateField(
      this.props.name, schema, formData.required, formData.name);
  }

  handleDelete(event) {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this field?")) {
      this.props.removeField(this.props.name);
    }
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({edit: false});
  }

  handleDrop(data) {
    const {name, swapFields, insertField} = this.props;
    if ("moved-field" in data && data["moved-field"]) {
      if (data["moved-field"] !== name) {
        swapFields(data["moved-field"], name);
      }
    } else if ("field" in data && data.field) {
      insertField(JSON.parse(data.field), name);
    }
  }

  render() {
    const props = this.props;

    if (this.state.edit) {
      return (
        <FieldPropertiesEditor
          {...props}
          cancel={this.handleCancel.bind(this)}
          update={this.handleUpdate.bind(this)} />
      );
    }

    if (props.schema.type === "object") {
      if (!props.name) {
        // This can only be the root form object, returning a regular SchemaField.
        return <SchemaField {...props} idSchema={{id: props.name}} />;
      }
      // This is a preset fieldSet
      return (
        <DraggableFieldContainer
          dragData={props.name}
          onEdit={this.handleEdit.bind(this)}
          onDelete={this.handleDelete.bind(this)}
          onDoubleClick={this.handleEdit.bind(this)}
          onDrop={this.handleDrop.bind(this)}>
          <SchemaField {...props}
            SchemaField={SchemaField}
            schema={this.state.schema}
            idSchema={{id: props.name}} />
        </DraggableFieldContainer>
      );
    }

    return (
      <DraggableFieldContainer
        draggableType="moved-field"
        droppableTypes={["moved-field", "field"]}
        dragData={props.name}
        onEdit={this.handleEdit.bind(this)}
        onDelete={this.handleDelete.bind(this)}
        onDoubleClick={this.handleEdit.bind(this)}
        onDrop={this.handleDrop.bind(this)}>
        <SchemaField {...props}
          schema={this.state.schema}
          idSchema={{id: props.name}} />
      </DraggableFieldContainer>
    );
  }
}
