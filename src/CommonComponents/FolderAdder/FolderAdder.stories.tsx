import { useState } from "react";
import { FolderItem } from "../../store/folders/types";
import FolderAdder, { Folder } from "./FolderAdder";

export default {
  title: "Folder Adder",
  component: FolderAdder,
};

const folders: FolderItem[] = [
  {
    title: "",
    id: "0",
    label: "Root",
    children: {},
    parent: {},
    path: "",
  },
  {
    title: "",
    id: "1",
    label: "Folder 1",
    children: {},
    parent: {},
    path: "",
  },
];

export const Primary = () => {
  const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>(
    undefined
  );
  const onAdd = (folder: FolderItem) => {
    return folder;
  };

  const handleSelect = (folder: FolderItem) => {
    setSelectedFolder(folder);
  };

  const [input, setInput] = useState("");

  return (
    <FolderAdder
      folderData={folders}
      onAdd={onAdd}
      selectedFolder={selectedFolder!}
      onSelect={handleSelect}
      input={input}
      setInput={setInput}
    />
  );
};
