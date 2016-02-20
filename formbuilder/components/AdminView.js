import React, { Component } from "react";

const EXCLUDED_FIELDS = ["last_modified", "id"];

export default class AdminView extends Component {
  componentDidMount() {
    if (this.props.records.length === 0) {
      this.props.getRecords(this.props.params.id);
    }
  }
  render() {return (
    <div>
      <h3>Results</h3>
      <table className="table table-striped">
      <tbody>
      {this.props.records.map((record) => {
        return (<tr>{
          Object.keys(record)
          .filter((key) => {
            return EXCLUDED_FIELDS.indexOf(key) == -1;
          })
          .map((key) => {
            return <td>{record[key]}</td>;
          }
        )}
        </tr>);
      })}
      </tbody>
      </table>
    </div>
  );
  }
}
