import { FolderActionTypes, FolderItem, allFoldersState } from "./types";

export const setCurrentFolderDetails = (payload: FolderItem) => {
  return <const>{
    type: FolderActionTypes.SET_CURRENT_FOLDER_DETAILS,
    payload,
  };
};

export const getCurrentFolderDetails = (payload: FolderItem) => {
  return <const>{
    type: FolderActionTypes.GET_CURRENT_FOLDER_DETAILS,
    payload,
  };
};

export const addNewFolder = (payload: FolderItem) => {
  return <const>{
    type: FolderActionTypes.ADD_NEW_FOLDER,
    payload,
  };
};

export const deleteFolder = (payload: string) => {
  return <const>{
    type: FolderActionTypes.DELETE_FOLDER,
    payload,
  };
};

export const editFolder = (payload: { label: string; id: string }) => {
  return <const>{
    type: FolderActionTypes.EDIT_FOLDER,
    payload,
  };
};

export const getAllFolders = () => {
  return <const>{
    type: FolderActionTypes.GET_ALL_FOLDERS,
  };
};

export const setAllFolders = (payload: allFoldersState) => {
  return <const>{
    type: FolderActionTypes.SET_ALL_FOLDERS,
    payload,
  };
};

export const deleteFolderSuccess = (payload: string) => {
  return <const>{
    type: FolderActionTypes.DELETE_FOLDER_SUCCESS,
    payload,
  };
};

export const addBookmarkDataToFolder = (payload: {
  folderId: string;
  bookmarkId: string;
}) => {
  return <const>{
    type: FolderActionTypes.ADD_BOOKMARK_DATA_TO_FOLDER,
    payload,
  };
};

export const deleteBookmarkFromFolder = (payload: {
  folderId: string;
  bookmarkId: string;
}) => {
  return <const>{
    payload,
    type: FolderActionTypes.DELETE_BOOKMARK_FROM_FOLDER,
  };
};
export const setFolderEditLoader = (payload: boolean) => {
  return <const>{
    type: FolderActionTypes.SET_FOLDER_EDIT_LOADER,
    payload,
  };
};

export const setFolderAddLoader = (payload: boolean) => {
  return <const>{
    type: FolderActionTypes.SET_FOLDER_ADD_LOADER,
    payload,
  };
};

export const editBookmarkInFolders = (payload: {newFolderId: string, oldFolderId: string, bookmarkId: string} ) => {
  return <const>{
    type: FolderActionTypes.EDIT_BOOKMARK_IN_FOLDERS,
    payload,
  };
}