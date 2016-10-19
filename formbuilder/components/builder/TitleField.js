import React, {PropTypes} from "react";
import {RIEInput} from "riek";

function TitleField(props) {
  const onUpdate = function(formData) {
    props.updateFormTitle(formData);
  };

  const {id, title=""} = props;
  return (
    <legend id={id}>
      <RIEInput
        className="edit-in-place"
        propName="title"
        value={title}
        change={onUpdate} />
    </legend>
  );
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default TitleField;
