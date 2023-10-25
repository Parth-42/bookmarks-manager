import { treeData } from "../../__mocks__/treeData";
import FolderNavigation from "./FolderNavigation";

export default {
  title: "FolderNavigation",
  component: FolderNavigation,
};

export const Primary = () => {
  const data = treeData;
  return (
    <FolderNavigation
      variant="tags"
      data={data}
      onAdd={(nodeKey: string) => {}}
      onEdit={(nodeKey: string) => {}}
      onDelete={(nodeKey: string) => {}}
      onBlur={(nodeData: { id: string; label: string }) => {}}
      // onChange={() => {}}
      onChange={(
        data: { value: string; nodeKey: string },
        selected: boolean
      ) => {}}
      onSelect={(nodeKey: string) => {}}
    />
  );
};
