import React, { FC, useState } from "react";
import Tree, { TreeInterface } from "./Tree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faFolder,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "font-awesome/css/font-awesome.css";
import { useMemo } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useRef } from "react";
import { useEffect } from "react";
import "./FolderNavigation.scss";

interface NodeInterface extends Omit<TreeInterface, "keys"> {
  nodeKey: string;
}

const TreeNode: FC<NodeInterface> = ({
  data,
  nodeKey,
  variant,
  icons,
  menu,
  onAdd,
  onEdit,
  onDelete,
  onChange,
  onBlur,
  onSelect,
  selectedId,
}) => {
  const [childVisiblity, setChildVisibility] = useState(false);

  const [displayB, setDisplayB] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const inputRef: React.LegacyRef<HTMLInputElement> | undefined = useRef(null);

  const [displayLabel, setDisplayLabel] = useState(true);

  // const [selectFolder, setSelectFolder] = useState(false);

  const [value, setValue] = useState(data["folders"][nodeKey].label);

  //ADD PATH
  // const str = path!.concat(value + "/");
  // console.log("PATH:", str);

  const [displayInput, setDisplayInput] = useState(false);

  const showButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setDisplayB(true);
  };

  const hideButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setDisplayB(false);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const parentKeys = Object.keys(data.folders[nodeKey]["parent"]);
  let currentPath = "";

  if (variant !== "tags") {
    const parentPath = data.folders[nodeKey].path!;
    currentPath = parentPath + "/";
  }

  const hasParent = parentKeys.length > 0;

  const x = data.folders[nodeKey]["children"];

  const y = Object.keys({ ...x });

  const hasChild = useMemo(() => {
    if (y.length > 0) {
      return true;
    } else {
      return false;
    }
  }, [y.length]);

  useEffect(() => {
    if (displayInput === true) {
      inputRef.current && inputRef.current.focus();
    }
  }, [displayInput]);

  const childVisiblityHandler = () => {
    setChildVisibility(!childVisiblity);
  };

  const showEditInput = () => {
    setDisplayLabel(!displayLabel);
    setDisplayInput(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    console.log("on blur");
    setDisplayInput(false);
    setDisplayLabel(!displayLabel);
    const nodeData = {
      id: nodeKey,
      label: value,
    };
    onBlur && onBlur(nodeData);
  };

  const handleAdd = () => {
    // console.log("add button");
    onAdd && onAdd(nodeKey, currentPath);
  };

  const handleEdit = () => {
    console.log("edit button");
    onEdit && onEdit(nodeKey);
  };

  const handleDelete = () => {
    console.log("delete button");
    onDelete && onDelete(nodeKey);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change handler for [tags] checkbox");
    onChange && onChange({ value: value, nodeKey: nodeKey }, e.target.checked);
  };

  return (
    <li
      className={`d-tree-node ${
        variant === "tags" ? "tags-with-checkbox" : ""
      }`}
    >
      <div className="input-tag">
        <div>
          {variant === "tags" && !hasParent ? (
            <input
              type="checkbox"
              name="checkboxx"
              id="checkboxx"
              onChange={handleInputChange}
            />
          ) : (
            ""
          )}
        </div>

        {hasChild ? (
          <div className={`d-inline d-tree-toggler`}>
            <FontAwesomeIcon
              icon={faCaretRight}
              className={`margin-r-icon ${childVisiblity ? "active" : ""}`}
              onClick={(e) => setChildVisibility(!childVisiblity)}
            />
          </div>
        ) : (
          <div className="empty-div"></div>
        )}

        <div
          className={`col d-tree-head ${displayLabel ? "" : "addUnderLine"} ${
            nodeKey === selectedId ? "folder-selected" : ""
          }`}
          onMouseEnter={(e) => showButton(e)}
          onMouseLeave={(e) => hideButton(e)}
          onClick={() => {
            onSelect && onSelect(nodeKey);
          }}
        >
          {variant === "tags" ? (
            ""
          ) : (
            <FontAwesomeIcon className={`margin-r`} icon={faFolder} />
          )}
          <div className="insideFolderHead">
            {displayLabel && (
              <span
                className={`folderLabel`}
                onClick={() => {
                  childVisiblityHandler();
                }}
              >
                {value}
              </span>
            )}
            <input
              className={`inputLabel ${displayInput ? "notHidden" : "hidden"} `}
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={inputRef}
            />
          </div>
          {displayLabel ? (
            <div className="menuDisplayer">
              {menu ? (
                <div className="menuContainer">
                  <div className={displayB ? "displayed" : "notdisplayed"}>
                    <i onClick={handleClick}>
                      <MoreVert id="menuIcon" />
                    </i>
                    {variant === "tags" ? (
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        className="menuWidth"
                      >
                        <MenuItem id="menuItem" onClick={handleEdit}>
                          <span>Remove Merge</span>
                        </MenuItem>
                        <MenuItem id="menuItem" onClick={handleDelete}>
                          Merge
                        </MenuItem>
                      </Menu>
                    ) : (
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        className="menuWidth"
                      >
                        <MenuItem id="menuItem" onClick={handleAdd}>
                          Add Sub Folder
                        </MenuItem>
                        <MenuItem id="menuItem" onClick={handleEdit}>
                          Rename
                        </MenuItem>
                        <MenuItem id="menuItem" onClick={handleDelete}>
                          Delete
                        </MenuItem>
                      </Menu>
                    )}
                  </div>
                </div>
              ) : (
                <div className={`iconContainer`}>
                  <div className={displayB ? "displayed" : "notdisplayed"}>
                    <FontAwesomeIcon
                      className="icons"
                      icon={faPlus}
                      onClick={handleAdd}
                    />
                    <FontAwesomeIcon
                      className="icons"
                      icon={faPen}
                      onClick={() => {
                        showEditInput();
                        handleEdit();
                      }}
                    />
                    <FontAwesomeIcon
                      className="icons"
                      icon={faTrash}
                      onClick={handleDelete}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {hasChild && childVisiblity && (
        <div className="d-tree-content">
          <ul className="d-tree-container flex-column">
            <Tree
              variant={variant}
              data={data}
              keys={y}
              menu={menu}
              icons={icons}
              onAdd={onAdd}
              onEdit={onEdit}
              onBlur={onBlur}
              onDelete={onDelete}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          </ul>
        </div>
      )}
    </li>
  );
};

export default TreeNode;
