import { AddBookmarkPayload, Bookmark, BookmarkActionTypes, EditBookmarkPayload, EditBookmarkSuccess } from "./types";

export const addBookmark = (payload: AddBookmarkPayload) => {
  return <const>{
    type: BookmarkActionTypes.ADD_BOOKMARK,
    payload,
  };
};

export const getAllBookmarks = () => {
  return <const>{
    type: BookmarkActionTypes.GET_ALL_BOOKMARKS,
  };
};

export const setAllBookmarks = (payload: Bookmark[]) => {
  return <const>{
    type: BookmarkActionTypes.SET_ALL_BOOKMARKS,
    payload,
  };
};

export const addBookmarkSuccess = (payload: Bookmark) => {
  return <const>{
    type: BookmarkActionTypes.ADD_BOOKMARK_SUCCESS,
    payload,
  };
};


export const addBookmarkToFavourite = (payload: string) => {
  return <const>{
    type: BookmarkActionTypes.ADD_BOOKMARK_TO_FAVOURITE,
    payload,
  };
};

export const addBookmarkToFavouriteSuccess = (payload: string) => {
  return <const>{
    type: BookmarkActionTypes.ADD_BOOKMARK_TO_FAVOURITE_SUCCESS,
    payload,
  };
};


export const selectBookmark = (payload: string) => {
  return <const>{
    type: BookmarkActionTypes.SELECT_BOOKMARK,
    payload,
  };
};

export const deleteBookmark = (payload: string) => {
  return <const>{
    type: BookmarkActionTypes.DELETE_BOOKMARK,
    payload,
  };
};

export const editBookmarkDetails = (payload: EditBookmarkPayload) => {
  return <const>{
    type: BookmarkActionTypes.EDIT_BOOKMARK_DETAILS,
    payload,
  };
};

export const editBookmarkDetailsSuccess = (payload: EditBookmarkSuccess) => {
  return <const>{
    type: BookmarkActionTypes.EDIT_BOOKMARK_DETAILS_SUCCESS,
    payload,
  };
};

export const deleteBookmarkSuccess = (payload: string) => {
  return <const>{
    type: BookmarkActionTypes.DELETE_BOOKMARK_SUCCESS,
    payload,
  };
};

export const setBookmarkLoader = (payload: boolean) => {
  return <const>{
    type: BookmarkActionTypes.SET_BOOKMARK_LOADER,
    payload,
  };
};
