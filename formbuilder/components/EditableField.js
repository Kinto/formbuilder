import React, { Component } from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import Form from "react-jsonschema-form";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";


function shouldHandleDoubleClick(node) {
  // disable doubleclick on number input, so people can use inc/dec arrows
  if (node.tagName === "INPUT" &&
      node.getAttribute("type") === "number") {
    return false;
  }
  return true;
}

function FieldPropertiesEditor(props) {
  const {schema, name, required, uiSchema, cancel, update} = props;
  const formData = {...schema, name, required};
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <strong>Edit {name}</strong>
        <button type="button" className="close-btn"
          onClick={cancel}>
          <i className="glyphicon glyphicon-remove-sign"/>
        </button>
      </div>
      <div className="panel-body">
        <Form
          schema={uiSchema.editSchema}
          formData={formData}
          onSubmit={update} />
      </div>
    </div>
  );
}

function DraggableFieldContainer(props) {
  const {
    children,
    draggableType,
    droppableTypes,
    dragData,
    onEdit,
    onDelete,
    onDoubleClick,
    onDrop
  } = props;
  return (
    <Draggable type={draggableType} data={dragData}>
      <Droppable types={droppableTypes} data={dragData}
        onDrop={onDrop}>
        <div className="row editable-field" onDoubleClick={onDoubleClick}>
          <div className="col-sm-9">
            {children}
          </div>
          <div className="col-sm-3 editable-field-actions">
            <button type="button" onClick={onEdit}>
              <i className="glyphicon glyphicon-edit"/>
            </button>
            <button type="button" onClick={onDelete}>
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
    function pickKeys(source, target) {
      const result = {};
      for (let key in source) {
        result[key] = target[key];
      }
      return result;
    }
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
        return <SchemaField {...props}/>;
      }
      // This is a preset fieldSet
      return (
        <DraggableFieldContainer
          draggableType="moved-field"
          droppableTypes={["field", "moved-field"]}
          dragData={props.name}
          onEdit={this.handleEdit.bind(this)}
          onDelete={this.handleDelete.bind(this)}
          onDoubleClick={this.handleEdit.bind(this)}
          onDrop={this.handleDrop.bind(this)}>
          <SchemaField {...props}
            SchemaField={SchemaField}
            schema={this.state.schema} />
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
          schema={this.state.schema} />
      </DraggableFieldContainer>
    );
  }
}
