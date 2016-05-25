import React, { Component } from "react";
import CSVDownloader from "./CSVDownloader";

export default class AdminView extends Component {
  componentDidMount() {
    const collection = this.props.params.id;
    const adminToken = this.props.params.adminToken;
    this.props.getRecords(collection, adminToken);
    this.props.loadSchema(collection);
  }
  render() {
    const properties = this.props.schema.properties;
    const title = this.props.schema.title;
    const ready = Object.keys(properties).length !== 0;
    const schemaFields = this.props.uiSchema["ui:order"];

    let content = "loading";
    if (ready) {
      content = (
      <div>
        <h3>Results for {title}</h3>
        <CSVDownloader
          schema={this.props.schema}
          fields={schemaFields}
          records={this.props.records} />
        <table className="table table-striped">
        <thead>
          <tr>{
            schemaFields.map((key) => {
              return <th key={key}>{properties[key].title}</th>;
            })
          }</tr>
        </thead>
        <tbody>
        {this.props.records.map((record) => {
          return (<tr key={record.id}>{
            schemaFields.map((key) => {
              return <td key={key}>{String(record[key])}</td>;
            }
          )}
          </tr>);
        })}
        </tbody>
        </table>
      </div>);
    }
    return <div className="test">{content}</div>;
  }
}
