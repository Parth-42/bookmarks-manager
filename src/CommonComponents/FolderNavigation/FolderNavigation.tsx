import React, { FC } from "react";
import Tree from "./Tree";
import "font-awesome/css/font-awesome.css";
import { ITreeData } from "../../__mocks__/treeData";

export interface FolderNavigationProps {
  variant?: "tags" | "normal";
  data: ITreeData;
  icons?: boolean;
  menu?: boolean;
  onAdd?: (nodeKey: string, path: string) => void;
  onEdit?: (nodeKey: string) => void;
  onDelete?: (nodeKey: string) => void;
  onChange?: (
    data: { value: string; nodeKey: string },
    selected: boolean
  ) => void;
  onBlur?: (nodeData: { id: string; label: string }) => void;
  onSelect?: (nodeKey: string) => void;
  selectedId?: string;
}

const FolderNavigation: FC<FolderNavigationProps> = ({
  variant,
  data,
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
  const rootKeys = Object.keys(data.root);
  return (
    <Tree
      data={data}
      keys={rootKeys}
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
  );
};

export default FolderNavigation;
