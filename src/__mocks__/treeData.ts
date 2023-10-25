export interface IFolders {
  [key: string]: {
    title?: string;
    label: string;
    children: { [key: string]: boolean };
    parent: { [key: string]: boolean };
    path?: string 
  };
}
export interface ITags {
  [key: string]: {
    title?: string;
    label: string;
    children: { [key: string]: boolean };
    parent: { [key: string]: boolean };
    path?: string
  };
}

export interface FolderNode {
  title?: string;
  label: string;
  children: { [key: string]: boolean };
}

export interface ITreeData {
  root: { [key: string]: boolean };
  folders: IFolders | ITags;
}

export const treeData: ITreeData = {
  root: {
    folder1: true,
    folder8: true,
  },
  folders: {
    folder1: {
      label: "Folder 1",
      title: "Documents Folder",
      parent: {},
      children: {},
      path: "",
    },
    folder2: {
      label: "Folder 2",
      title: "Documents Folder",
      parent: {},
      children: {},
      path: ""
    },
  },
};
