import React, { Component } from "react";

const EXCLUDED_FIELDS = ["last_modified", "id", "schema"];

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
    const schemaFields = Object.keys(properties).filter((key) => {
      return EXCLUDED_FIELDS.indexOf(key) == -1;
    }).sort();

    let content = "loading";
    if (ready) {
      content = (
      <div>
        <h3>Results for {title}</h3>
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
    /**
    const fields = Object.keys(records[0])
      .filter((key) => {
        return EXCLUDED_FIELDS.indexOf(key) == -1;
      })
      .sort();

  );*/
  }
}
