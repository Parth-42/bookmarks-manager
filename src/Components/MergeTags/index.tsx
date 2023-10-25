import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../CommonComponents/Button/Button";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import { ModalActionTypes } from "../../store/modal/types";
import "./index.scss";

const MergeTags = () => {
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
    <div id="merge-tags-container">
      <div>
        <TextInput
          label="TAG NAME"
          variant="primary"
          value={input}
          onValueChange={handleChange}
          className="merge-component"
        />
        <Button
          variant="secondary"
          className="merge-button"
          onClickHandler={handleClick}
        >
          Merge
        </Button>
      </div>
    </div>
  );
};

export default MergeTags;
