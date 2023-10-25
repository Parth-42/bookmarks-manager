import {
  setCurrentFolderDetails,
  getCurrentFolderDetails,
  addNewFolder,
  deleteFolder,
  editFolder,
  getAllFolders,
  setAllFolders,
  deleteFolderSuccess,
  addBookmarkDataToFolder,
  deleteBookmarkFromFolder,
  setFolderEditLoader,
  setFolderAddLoader,
  editBookmarkInFolders,
} from "./actions";

export const FolderActionTypes = <const>{
  GET_CURRENT_FOLDER_DETAILS: "GET_CURRENT_FOLDER_DETAILS",
  SET_CURRENT_FOLDER_DETAILS: "SET_CURRENT_FOLDER_DETAILS",
  ADD_NEW_FOLDER: "ADD_NEW_FOLDER",
  GET_FOLDER_DELETE_ID: "GET_FOLDER_DELETE_ID",
  DELETE_FOLDER: "DELETE_FOLDER",
  EDIT_FOLDER: "EDIT_FOLDER",
  GET_ALL_FOLDERS: "GET_ALL_FOLDERS",
  SET_ALL_FOLDERS: "SET_ALL_FOLDERS",
  DELETE_FOLDER_SUCCESS: "DELETE_FOLDER_SUCCESS",
  ADD_BOOKMARK_DATA_TO_FOLDER: "ADD_BOOKMARK_DATA_TO_FOLDER",
  DELETE_BOOKMARK_FROM_FOLDER: "DELETE_BOOKMARK_FROM_FOLDER",
  SET_FOLDER_EDIT_LOADER: "SET_FOLDER_EDIT_LOADER",
  SET_FOLDER_ADD_LOADER: "SET_FOLDER_ADD_LOADER",
  EDIT_BOOKMARK_IN_FOLDERS: "EDIT_BOOKMARK_IN_FOLDERS"
};

export interface FolderItem {
  title: string;
  label: string;
  children: { [key: string]: boolean };
  parent: { [key: string]: boolean };
  id: string;
  bookmarks?: {
    [key: string]: boolean;
  };
  path: string;
}

export interface FolderState {
  currentFolder: FolderItem;
  availableFolders: FolderItem[];
  root: IRootFolders;
  isFolderDeleting?: boolean;
  isFolderAdding?: boolean;
  isFolderEditing?: boolean;
}

export interface IFolderState {
  folder: {
    currentFolder: FolderItem;
    availableFolders: FolderItem[];
    root: IRootFolders;
  };
}

export interface allFoldersState {
  folders: FolderItem[];
  root: IRootFolders;
}
export interface IRootFolders {
  [key: string]: boolean;
}

export type FolderAction =
  | ReturnType<typeof setCurrentFolderDetails>
  | ReturnType<typeof getCurrentFolderDetails>
  | ReturnType<typeof addNewFolder>
  | ReturnType<typeof deleteFolder>
  | ReturnType<typeof editFolder>
  | ReturnType<typeof getAllFolders>
  | ReturnType<typeof setAllFolders>
  | ReturnType<typeof deleteFolderSuccess>
  | ReturnType<typeof addBookmarkDataToFolder>
  | ReturnType<typeof deleteBookmarkFromFolder>
  | ReturnType<typeof setFolderEditLoader>
  | ReturnType<typeof setFolderAddLoader>
  | ReturnType<typeof editBookmarkInFolders>

