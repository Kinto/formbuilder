import React, { Component } from "react";
import ClipboardButton from "react-clipboard.js";
import {getFormID, getFormURL, getAdminURL} from "../utils";
import URLDisplay from "./URLDisplay";

export default class FormCreated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  onClipboardCopied() {
    this.setState({copied: true});
  }

  render() {
    const adminToken = this.props.params.adminToken;
    const formID = getFormID(adminToken);

    const userformURL = getFormURL(formID);
    const adminURL = getAdminURL(adminToken);

    const twitterText = `I've just created a form, it is at ${userformURL}!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}`;

    const emailSubject = `Hey, I just created a new form`;
    const emailBody = `Hi folks,

I just created a new form and it's available at:

    ${userformURL}

Please, take some time to fill it,
`;

    const emailUrl = `mailto:?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`;
    return (
      <form>
        <h3>Neat, your form is now ready!</h3>
        <div className="form-group">
          <ul className="list-inline">
            <li><button className="btn btn-link"><i className="glyphicon glyphicon-send" />
              <a href={emailUrl}> Send by email</a></button>
            </li>
            <li><button className="btn btn-link"><i className="glyphicon glyphicon-cloud" />
              <a href={twitterUrl}> Tweet it</a></button>
            </li>
            <li>
            <ClipboardButton
              className="btn btn-link"
              data-clipboard-text={userformURL}
              onSuccess={this.onClipboardCopied.bind(this)}>
              <i className="glyphicon glyphicon-copy" /> <a>{this.state.copied ? "Copied!" : "Copy to clipboard"}</a>
            </ClipboardButton>
            </li>
          </ul>
          <URLDisplay url={userformURL} />
          <URLDisplay url={adminURL} type="admin" />
        </div>
      </form>
    );
  }
}
