import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../CommonComponents/Button/Button";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import { StoreState } from "../../store";
import { getCurrentFolderDetails } from "../../store/folders/actions";
import { ModalActionTypes } from "../../store/modal/types";
import "./index.scss";

const CreateFolder = () => {
  const [input, setInput] = useState("");
  const handleChange = (s: string) => {
    setInput(s);
  };

  const { id, path } = useSelector((state: StoreState) => state.modal.data);

  const dispatch = useDispatch();

  const newPath = path + input;

  const createNewFolder = () => {
    const data = {
      label: input,
      title: "Document Folder 1",
      children: {},
      parent: {},
      id: id!,
      path: newPath,
    };

    dispatch(getCurrentFolderDetails(data));
    dispatch({
      type: ModalActionTypes.HIDE_MODAL,
    });
    setInput("");
  };

  return (
    <div id="container">
      <div>
        <TextInput
          label="Folder Name"
          variant="primary"
          value={input}
          onValueChange={handleChange}
          className="search-component"
          placeholder="Create Folder"
        />
        <Button
          variant="secondary"
          className="create-button"
          onClickHandler={createNewFolder}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateFolder;
