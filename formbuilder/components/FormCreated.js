import React from "react";
import {getUserToken, getUserURL, getAdminURL} from "../utils";
import URLDisplay from "./URLDisplay";

export default function FormCreated(props) {
  const adminToken = props.params.adminToken;
  const userToken = getUserToken(adminToken);

  const userformURL = getUserURL(userToken);
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
        <ul className="social">
          <li><i className="glyphicon glyphicon-send" />
            <a href={emailUrl}> Send by email</a>
          </li>
          <li><i className="glyphicon glyphicon-cloud" />
            <a href={twitterUrl}> Tweet it</a>
          </li>
        </ul>
        <URLDisplay url={userformURL} />
        <URLDisplay url={adminURL} type="admin" />
      </div>
    </form>
  );
}
