import React, { FC, useEffect, useState } from "react";
import { FolderItem } from "../../store/folders/types";
import "./FolderAdder.scss";
import OutsideClickHandler from "react-outside-click-handler";

export type Folder = {
  title: string;
  label: string;
  children: { [key: string]: boolean };
  parent: { [key: string]: boolean };
  id: string;
  bookmarks?: {
    [key: string]: boolean;
  };
};

interface FolderAdderProps {
  folderData: FolderItem[];
  onAdd: (folder: FolderItem) => Folder;
  className?: string;
  id?: string;
  selectedFolder: Folder;
  onSelect: (folder: FolderItem) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const FolderAdder: FC<FolderAdderProps> = ({
  folderData,
  onAdd,
  className,
  id,
  selectedFolder,
  onSelect,
  input,
  setInput,
  //   setSelectedFolder,
}) => {
  // const [input, setInput] = useState("");
  const [foundFolder, setFoundFolder] = useState(false);
  const [folders, setFolders] = useState<FolderItem[]>(folderData);
  const [show, setShow] = useState(false);
  const [filteredFolders, setFilteredFolders] = useState<FolderItem[]>(
    folderData
  );

  useEffect(() => {
    setFolders(folderData);
    setFilteredFolders(folderData);
  }, [folderData]);

  const createFolder = (label: string) => {
    const folder = {
      label: label,
      id: "",
      title: "Document Folder 1",
      children: {},
      parent: {},
      path: "",
    };

    setFolders([...folders, folder]);
    // setSelectedFolder(folder);
    onSelect(folder);

    setInput(folder.label);
    setShow(!show);
    onAdd(folder);
  };

  const addFolder = (id: string) => {
    folders.forEach((folder) => {
      if (folder.id === id) {
        // setSelectedFolder(folder);
        onSelect(folder);

        setInput(folder.label);
        setShow(!show);
      }
    });
  };

  useEffect(() => {
    const isMatched = folders.some((folder) => {
      if (folder.label.toLowerCase() === input.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    });
    setFoundFolder(isMatched);

    const arr = folders.filter((folder) => {
      if (input === "") {
        return folder;
      } else if (folder.label.toLowerCase().includes(input.toLowerCase())) {
        return folder;
      }
      return [];
    });
    setFilteredFolders(arr);
  }, [input, folders]);

  const outerRef = React.useRef(null);

  return (
    <div className={`folder-adder-container ${className}`} id={id}>
      <OutsideClickHandler onOutsideClick={() => setShow(false)}>
        <p id="label">Folder</p>
        <div className="tags-input">
          <input
            type="text"
            id="search"
            placeholder="Select Folder"
            autoComplete="off"
            value={input}
            onFocus={() => {
              setShow(true);
              setInput("");
              onSelect({
                title: "",
                label: "",
                children: {},
                parent: {},
                id: "",
                path: "",
              });
            }}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {show ? (
          <div id="suggestions" ref={outerRef}>
            {input === ""
              ? ""
              : !foundFolder && (
                  <p
                    onFocus={() => setShow(true)}
                    className="newFolder"
                    onClick={() => createFolder(input)}
                  >
                    + {input}
                  </p>
                )}

            {filteredFolders.map((folder) => {
              return (
                <div className="folder" key={folder.id}>
                  <p
                    onFocus={() => setShow(true)}
                    onClick={() => addFolder(folder.id)}
                  >
                    {folder.label}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default FolderAdder;
