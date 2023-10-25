import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../CommonComponents/Button/Button";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import { ModalActionTypes } from "../../store/modal/types";
import "./index.scss";

const CreateTags = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const handleChange = (s: string) => {
    setInput(s);
  };
  const handleClick = () => {
    dispatch({
      type: ModalActionTypes.HIDE_MODAL,
    });
  };
  return (
    <div id="tag-wrapper">
      <div>
        <TextInput
          label="Add Tags"
          variant="primary"
          value={input}
          onValueChange={handleChange}
          className="tag-component"
        />
        <Button
          variant="secondary"
          className="create-tags-button"
          onClickHandler={handleClick}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default CreateTags;
