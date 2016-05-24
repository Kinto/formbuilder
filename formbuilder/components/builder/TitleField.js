import React, {PropTypes} from "react";
import {RIEInput} from "riek";

const REQUIRED_FIELD_SYMBOL = "#";



function TitleField(props) {
  const update = function(formData) {
    props.updateFormProperties(formData);
  };
    
  const {id, title, required} = props;
  return <legend id={id}><RIEInput propName="title" value={title} change={update} /></legend>;
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default TitleField;
