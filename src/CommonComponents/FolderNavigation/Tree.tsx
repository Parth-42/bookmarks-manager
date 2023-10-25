import React, { FC } from "react";
import TreeNode from "./TreeNode";
import "font-awesome/css/font-awesome.css";
import "./FolderNavigation.scss";
import { ITreeData } from "../../__mocks__/treeData";
import { FolderNavigationProps } from "./FolderNavigation";

export interface TreeInterface extends FolderNavigationProps {
  data: ITreeData;
  keys: string[];
}

const Tree: FC<TreeInterface> = ({
  data,
  keys = [],
  variant,
  icons,
  menu,
  onAdd,
  onEdit,
  onDelete,
  onBlur,
  onChange,
  onSelect,
  selectedId,
}) => {
  return (
    <div>
      <div className="d-tree">
        <ul className="d-tree-container ">
          {keys.map((key) => (
            <TreeNode
              key={key}
              data={data}
              nodeKey={key}
              variant={variant}
              icons={icons}
              menu={menu}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onBlur={onBlur}
              onChange={onChange}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tree;
