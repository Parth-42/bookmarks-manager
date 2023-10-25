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
import { TagItem, TagsActionTypes } from "../../store/tags/types";
import { ModalActionTypes } from "../../store/modal/types";
import {
  AddBookmarkPayload,
  BookmarkActionTypes,
} from "../../store/bookmark/types";
function AddlinkTemp() {
  const [newFolder, setNewFolder] = useState("");
  const [checked, setChecked] = useState(false);
  const [displayFolder, setDisplayFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [bookmarkUrl, setBookmarkUrl] = useState("");
  const [disableSave, setDisableSave] = useState(true);

  const dispatch = useDispatch();

  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (displayFolder) {
      setSelectedFolder("");
    } else {
      setNewFolder("");
    }

    if (selectedFolder !== "" || newFolder !== "") {
      if (bookmarkUrl !== "") {
        setDisableSave(false);
      } else setDisableSave(true);
    } else setDisableSave(true);
  }, [bookmarkUrl, selectedFolder, newFolder, displayFolder]);

  const handleTags = (s: string) => {
    setTagName(s);
  };

  const addTag = () => {
    const tagData: TagItem = {
      label: tagName,
      children: {},
      parent: {},
      id: "1234",
    };
    dispatch({
      type: TagsActionTypes.ADD_NEW_TAG,
      payload: tagData,
    });
    dispatch({
      type: ModalActionTypes.HIDE_MODAL,
    });
    setTagName("");
  };

  const handleChange = (s: string) => {
    setBookmarkUrl(s);
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleDisplayFolder = () => {
    setDisplayFolder(!displayFolder);
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

  const AddBookmarkUrl = () => {
    setSelectedFolder("");

    const data: AddBookmarkPayload = {
      url: bookmarkUrl,
      folderId: selectedFolder,
      folderLabel: newFolder,
      isFavourite: checked,
    };

    dispatch({
      type: BookmarkActionTypes.ADD_BOOKMARK,
      payload: data,
    });
    setBookmarkUrl("");
  };

  const handleClick = () => {
    AddBookmarkUrl();
    dispatch({
      type: ModalActionTypes.HIDE_MODAL,
    });
  };

  const favCheck = () => {
    setChecked(!checked);
  };

  return (
    <div id="add-link-wrapper">
      <div id="header-wrapper">
        <div id="header-icons">
          <div id="save-to">
            <span>*SAVE TO</span>
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
          <p>Add Link</p>
        </div>
      </div>
      <div id="content-wrapper">
        {displayFolder ? (
          <div id="folder-text-container">
            <div id="text-input-wrap">
              <TextInput
                label="FOLDER"
                variant="primary"
                value={newFolder}
                onValueChange={setNewFolder}
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
              label="* LINK URL"
              variant="primary"
              placeholder="Enter Bookmark Url"
              value={bookmarkUrl}
              onValueChange={handleChange}
              className="tag-component"
            />
          </div>
          <div id="text-input-wrap">
            <TextInput
              label="HASH TAG"
              variant="primary"
              placeholder="Enter Tags"
              value={tagName}
              onValueChange={handleTags}
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
              onChange={favCheck}
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

export default AddlinkTemp;
