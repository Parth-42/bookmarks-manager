import {
  FolderAction,
  FolderActionTypes,
  FolderItem,
  FolderState,
  IRootFolders,
} from "./types";

const initialState: FolderState = {
  currentFolder: {
    title: "",
    label: "",
    children: {},
    parent: {},
    id: "",
    bookmarks: {},
    path: ""
  },
  availableFolders: [],
  root: {},
  isFolderDeleting: false,
  isFolderAdding: false,
  isFolderEditing: false,
};

export const folderReducer = (
  state = initialState,
  action: FolderAction
): FolderState => {
  switch (action.type) {
    case FolderActionTypes.GET_CURRENT_FOLDER_DETAILS: {
      const { title, label, children, parent, id, path } = action.payload;
      const currentFolder: FolderItem = {
        title: title,
        label: label,
        children: children,
        parent: parent,
        id: id,
        path: path
      };
      return {
        ...state,
        currentFolder,
      };
    }

    case FolderActionTypes.SET_CURRENT_FOLDER_DETAILS: {
      const { title, label, children, parent, id, path } = action.payload;
      const currentFolder: FolderItem = {
        title: title,
        label: label,
        children: children,
        parent: parent,
        id: id,
        path: path
      };
      return {
        ...state,
        currentFolder,
      };
    }

    case FolderActionTypes.ADD_NEW_FOLDER: {
      const { id, parent } = action.payload;

      let isChild = false;

      const parentKeys = Object.keys(parent);

      if (parentKeys.length > 0) {
        isChild = true;
      }
      let parentFolder =
        parentKeys.length > 0
          ? state.availableFolders.find((folder) => folder.id === parentKeys[0])
          : undefined;

      if (parentFolder) {
        if (parentKeys.length > 0) {
          parentFolder.children[id] = true;
        }
      }
      const newFolderData: FolderItem = {
        ...action.payload,
        children: {},
      };
      state.availableFolders = [...state.availableFolders, newFolderData];
      return {
        ...state,
        root: isChild ? { ...state.root } : { ...state.root, [id]: true },
      };
    }

    case FolderActionTypes.SET_FOLDER_ADD_LOADER: {
      const isFolderAdding = action.payload;
      return {
        ...state,
        isFolderEditing: isFolderAdding,
      };
    }

    case FolderActionTypes.DELETE_FOLDER: {
      return {
        ...state,
        isFolderDeleting: true,
      };
    }

    case FolderActionTypes.DELETE_FOLDER_SUCCESS: {
      const id = action.payload;

      const toBeDeleted = state.availableFolders.find(
        (folder) => folder.id === id
      );

      const parent = toBeDeleted?.parent;
      const parentId = (parent && Object.keys(parent)) || [];
      const children = toBeDeleted?.children;
      const childrenIDs = (children && Object.keys(children)) || [];

      let finalFolders: FolderItem[] = [...state.availableFolders];
      let rootFolders: IRootFolders = { ...state.root };

      if (childrenIDs.length > 0) {
        finalFolders = deleteChildren(id, finalFolders);
      }

      if (parentId.length > 0) {
        const parent = finalFolders.find((folder) => folder.id === parentId[0]);
        if (parent) {
          delete parent["children"][id];
        }
      } else {
        delete rootFolders[id];
      }

      finalFolders = finalFolders.filter((folder) => folder.id !== id);
      return {
        ...state,
        availableFolders: finalFolders,
        root: rootFolders,
        isFolderDeleting: false,
      };
    }

    case FolderActionTypes.EDIT_FOLDER: {
      const { label, id } = action.payload;
      const currentFolder: { label: string; id: string } = {
        label: label,
        id: id,
      };

      const found = state.availableFolders.find(
        (folder) => folder.id === currentFolder.id
      );

      if (found) {
        found.label = currentFolder.label;
      }

      return {
        ...state,
      };
    }

    case FolderActionTypes.SET_FOLDER_EDIT_LOADER: {
      const isFolderEditing = action.payload;
      return {
        ...state,
        isFolderEditing: isFolderEditing,
      };
    }

    case FolderActionTypes.GET_ALL_FOLDERS: {
      return {
        ...state,
      };
    }

    case FolderActionTypes.SET_ALL_FOLDERS: {
      const { folders, root } = action.payload;

      return {
        ...state,
        availableFolders: [...state.availableFolders, ...folders],
        root: { ...state.root, ...root },
      };
    }

    case FolderActionTypes.ADD_BOOKMARK_DATA_TO_FOLDER: {
      const { bookmarkId, folderId } = action.payload;

      const selectedFolder = state.availableFolders.find(
        (item) => item.id === folderId
      );
      if (selectedFolder) {
        selectedFolder.bookmarks = {
          ...selectedFolder.bookmarks,
          [bookmarkId]: true,
        };
      }
      return {
        ...state,
      };
    }

    case FolderActionTypes.DELETE_BOOKMARK_FROM_FOLDER: {
      const { bookmarkId, folderId } = action.payload;

      const folder = state.availableFolders.find(
        (folder) => folder.id === folderId
      );

      if (folder && folder.bookmarks) {
        delete folder["bookmarks"][bookmarkId];
      }

      return {
        ...state,
        availableFolders: [...state.availableFolders],
      };
    }

    case FolderActionTypes.EDIT_BOOKMARK_IN_FOLDERS: {
      const {oldFolderId, newFolderId, bookmarkId} = action.payload


      const oldFolder = state.availableFolders.find(folder => folder.id === oldFolderId)
      const newFolder = state.availableFolders.find(folder => folder.id === newFolderId)
      const availableFolders = state.availableFolders

      if(oldFolder && oldFolder.bookmarks && newFolder && newFolder.bookmarks){
        delete oldFolder["bookmarks"][bookmarkId];

        newFolder.bookmarks = {
          ...newFolder.bookmarks,
          [bookmarkId]: true,
        };

        const oldIndex = state.availableFolders.indexOf(oldFolder)
        const newIndex = state.availableFolders.indexOf(newFolder)

        availableFolders[oldIndex] = {...oldFolder}
        availableFolders[newIndex] = {...newFolder}
      }

      return {
        ...state,
        availableFolders: [...availableFolders]
      }

    }

    default:
      return { ...state };
  }
};

export const deleteChildren = (id: string, availableFolders: FolderItem[]) => {
  const toBeDeleted = availableFolders.find((folder) => folder.id === id);
  const children = toBeDeleted?.children;
  const childrenIDs = (children && Object.keys(children)) || [];

  if (childrenIDs.length === 0) {
    const finalFolders = availableFolders.filter((folder) => folder.id !== id);
    return finalFolders;
  } else {
    for (let i = 0; i < childrenIDs.length; i++) {
      const data: FolderItem[] = deleteChildren(
        childrenIDs[i],
        availableFolders
      );
      const finalFolders = data.filter((folder) => folder.id !== id);
      return finalFolders;
    }
  }
  return availableFolders;
};
