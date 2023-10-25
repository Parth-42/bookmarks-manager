import Button from "../../CommonComponents/Button/Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FolderAdder from "../../CommonComponents/FolderAdder/FolderAdder";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import {
  AddBookmarkPayload,
  BookmarkActionTypes,
} from "../../store/bookmark/types";
import { FolderItem } from "../../store/folders/types";
import high_five from "../../assets/images/high_five.svg";
import "./QuickLink.scss";

interface QuickLinkProps {
  availableFolders: FolderItem[];
}

const QuickLink: React.FC<QuickLinkProps> = ({ availableFolders }) => {
  const [selectedFolder, setSelectedFolder] = useState<FolderItem | undefined>(
    undefined
  );
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [input, setInput] = useState("");
  const [disableSave, setDisableSave] = useState(true);

  const dispatch = useDispatch();

  const onAdd = (folder: FolderItem) => {
    setSelectedFolder(folder);
    return folder;
  };

  const handleSelect = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setSelectedFolderId(folder.id);
  };

  useEffect(() => {
    console.log("BOOKMARK URL:", bookmarkUrl);
    console.log("SELECTED FOLDER:", selectedFolder);

    if (
      bookmarkUrl !== "" &&
      selectedFolder?.label !== "" &&
      selectedFolder !== undefined
    ) {
      setDisableSave(false);
    } else setDisableSave(true);
  }, [bookmarkUrl, selectedFolder]);

  const AddBookmarkUrl = () => {
    const currFolder = selectedFolderId;
    const url = bookmarkUrl;
    const folderId = currFolder;

    setSelectedFolder(undefined);
    setInput("");

    const data: AddBookmarkPayload = {
      url: url,
      folderId: folderId,
      folderLabel: selectedFolder?.label!,
      isFavourite: false,
    };

    dispatch({
      type: BookmarkActionTypes.ADD_BOOKMARK,
      payload: data,
    });
    setBookmarkUrl("");
  };

  const handleBookmarkUrl = (s: string) => {
    setBookmarkUrl(s);
  };

  return (
    <div>
      <div id="quick-link">
        <div id="link-area">
          <h3>Add Quick Link</h3>
          <TextInput
            variant="primary"
            value={bookmarkUrl}
            onValueChange={handleBookmarkUrl}
            className="search-component"
            label="URL"
            placeholder="Enter URL"
          />
          <div id="save-area">
            <FolderAdder
              className="folder-adder"
              folderData={availableFolders}
              onAdd={onAdd}
              onSelect={handleSelect}
              selectedFolder={selectedFolder!}
              input={input}
              setInput={setInput}
            />
            <Button
              variant="primary"
              className="save-button"
              onClickHandler={AddBookmarkUrl}
              disabled={disableSave}
            >
              Save
            </Button>
          </div>
        </div>

        <div id="image-area">
          <img src={high_five} alt="" />
        </div>
      </div>
    </div>
  );
};

export default QuickLink;
