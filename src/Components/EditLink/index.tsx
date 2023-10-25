import React, { useEffect, useMemo, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { GoDiff } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Button from "../../CommonComponents/Button/Button";
import FolderNavigation from "../../CommonComponents/FolderNavigation/FolderNavigation";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import "./index.scss";
import "./check.css";
import { useDispatch, useSelector } from "react-redux";
import {
  IFolderState,
  IRootFolders,
  FolderItem,
} from "../../store/folders/types";
import { ModalActionTypes } from "../../store/modal/types";
import { StoreState } from "../../store";
import { editBookmarkDetails } from "../../store/bookmark/actions";
function EditLink() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [displayFolder, setDisplayFolder] = useState(false);

  // const id = useSelector((state: StoreState) => state.modal.id);
  const store = useSelector((state: StoreState) => state);
  const payloadData = useSelector((state: StoreState) => state.modal.data);
  const id = payloadData.id;

  const availableBookmarks = store.bookmark.availableBookmarks;
  const availableFolders = store.folder.availableFolders;
  const [disableSave, setDisableSave] = useState(true);

  const bookmark = availableBookmarks.find((bookmark) => bookmark.id === id);

  const bookmarkFolderId = bookmark!.folderId;

  const [url, setUrl] = useState(bookmark!.url);
  const [checked, setChecked] = useState(bookmark!.isFavourite);
  const [path, setPath] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  useEffect(() => {
    setSelectedFolder(bookmarkFolderId);
  }, [bookmarkFolderId]);

  useEffect(() => {
    if (selectedFolder !== "" && url !== "") {
      setDisableSave(false);
    } else setDisableSave(true);
  }, [selectedFolder, url]);

  useEffect(() => {
    if (selectedFolder.length > 0) {
      const folder = availableFolders.find(
        (folder) => folder.id === selectedFolder
      );
      if (folder) setPath(folder?.path);
    }
  }, [selectedFolder, availableFolders]);

  const data = {
    folderId: selectedFolder,
    id: bookmark!.id,
    url: url,
    isFavourite: checked!,
    tags: [],
    path: path,
  };

  const handleChange = (s: string) => {
    setInput(s);
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleDisplayFolder = () => {
    setDisplayFolder(!displayFolder);
  };

  const handleClick = () => {
    dispatch(editBookmarkDetails(data));
    dispatch({
      type: ModalActionTypes.HIDE_MODAL,
    });
  };

  const arr = useSelector(
    (state: IFolderState) => state.folder.availableFolders
  );
  const root = useSelector((state: IFolderState) => state.folder.root);

  const treeData = useMemo(() => {
    const tree: {
      root: IRootFolders;
      folders: { [key: string]: FolderItem };
    } = {
      root: {},
      folders: {},
    };

    arr.forEach((element: any) => {
      tree.folders[element.id] = element;
    });

    tree.root = { ...root };

    return tree;
  }, [arr, root]);

  const selectFolder = (id: string) => {
    setSelectedFolder(id);
  };

  return (
    <div id="add-link-wrapper">
      <div id="header-wrapper">
        <div id="header-icons">
          <div id="save-to">
            <span>SAVE TO</span>
          </div>
          <div id="folder-icon">
            {displayFolder ? (
              <span>
                <FaFolder onClick={handleDisplayFolder} />
              </span>
            ) : (
              <span>
                <GoDiff onClick={handleDisplayFolder} />
              </span>
            )}
          </div>
        </div>
        <div id="add-text-header">
          <p>Edit Link</p>
        </div>
      </div>
      <div id="content-wrapper">
        {displayFolder ? (
          <div id="folder-text-container">
            <div id="text-input-wrap">
              <TextInput
                label="FOLDER"
                variant="primary"
                value={input}
                onValueChange={handleChange}
                className="folder-input-component"
                placeholder="Enter Folder Name"
              />
            </div>
          </div>
        ) : (
          <div id="folder-component-wrapper">
            <FolderNavigation
              data={treeData}
              onSelect={(id) => selectFolder(id)}
              selectedId={selectedFolder}
            />
          </div>
        )}

        <div id="link-component-wrapper">
          <div id="text-input-wrap">
            <TextInput
              label="LINK URL"
              variant="primary"
              placeholder="Enter Bookmark Url"
              value={url}
              onValueChange={setUrl}
              className="tag-component"
            />
          </div>
          <div id="text-input-wrap">
            <TextInput
              label="HASH TAG"
              variant="primary"
              placeholder="Enter Tags"
              value={input}
              onValueChange={handleChange}
              className="tag-component"
            />
          </div>
          <div className="checkbox-wrapper">
            <label>Add to Favourties</label>
            <input
              type="checkbox"
              name="favourite"
              id="fav"
              checked={checked}
            />
            <span className="checkmark" onClick={handleCheckbox}></span>
          </div>
        </div>
      </div>
      <div id="footer">
        <div id="info-text">
          <p>
            <HiOutlineInformationCircle />
            If you dont select the folder the link automatically goes to root.
          </p>
        </div>
        <div id="end-save-button">
          <Button
            variant="secondary"
            className="save-link-button"
            onClickHandler={handleClick}
            disabled={disableSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditLink;
