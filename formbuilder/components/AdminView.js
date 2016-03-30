import React, { Component } from "react";
import CSVDownloader from "./CSVDownloader";

export default class AdminView extends Component {
  componentDidMount() {
    const collectionID = this.props.params.id;
    this.props.getRecords(collectionID);
    this.props.loadSchema(collectionID);
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
              return <th>{properties[key].title}</th>;
            })
          }</tr>
        </thead>
        <tbody>
        {this.props.records.map((record) => {
          return (<tr>{
            schemaFields.map((key) => {
              return <td>{String(record[key])}</td>;
            }
          )}
          </tr>);
        })}
        </tbody>
        </table>
      </div>);
    }
    return <div>{content}</div>;
  }
}
