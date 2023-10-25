import {
  addBookmark,
  addBookmarkSuccess,
  addBookmarkToFavourite,
  addBookmarkToFavouriteSuccess,
  deleteBookmark,
  editBookmarkDetails,
  editBookmarkDetailsSuccess,
  deleteBookmarkSuccess,
  getAllBookmarks,
  selectBookmark,
  setAllBookmarks,
  setBookmarkLoader,
} from "./actions";

export const BookmarkActionTypes = <const>{
  ADD_BOOKMARK: "ADD_BOOKMARK",
  GET_ALL_BOOKMARKS: "GET_ALL_BOOKMARKS",
  SET_ALL_BOOKMARKS: "SET_ALL_BOOKMARKS",
  ADD_BOOKMARK_SUCCESS: "ADD_BOOKMARK_SUCCESS",
  ADD_BOOKMARK_TO_FAVOURITE: "ADD_BOOKMARK_TO_FAVOURITE",
  ADD_BOOKMARK_TO_FAVOURITE_SUCCESS: "ADD_BOOKMARK_TO_FAVOURITE_SUCCESS",
  SELECT_BOOKMARK: "SELECT_BOOKMARK",
  DELETE_BOOKMARK: "DELETE_BOOKMARK",
  EDIT_BOOKMARK_DETAILS: "EDIT_BOOKMARK_DETAILS",
  EDIT_BOOKMARK_DETAILS_SUCCESS: "EDIT_BOOKMARK_DETAILS_SUCCESS",
  DELETE_BOOKMARK_SUCCESS: "DELETE_BOOKMARK_SUCCESS",
  SET_BOOKMARK_LOADER: "SET_BOOKMARK_LOADER"
};

export interface BookmarkState {
  currentBookmark: Bookmark;
  availableBookmarks: Bookmark[];
  selectedBookmarks: string[];
  bookmarkLoader?: boolean
}
export interface AddBookmarkPayload {
  folderId: string;
  url: string;
  imageUrl?: string;
  imageLabel?: string;
  description?: string;
  isFavourite?: boolean;
  tags?: string[];
  folderLabel: string;
  isSelected?: boolean;
  path?: string;
}

export interface Bookmark {
  folderId: string;
  url: string;
  imageUrl?: string;
  imageLabel?: string;
  description?: string;
  isFavourite?: boolean;
  tags?: string[];
  id: string;
  isSelected?: boolean;
  path?: string;
}

export interface EditBookmarkPayload {
  id: string,
  url: string,
  isFavourite: boolean,
  tags: string[],
  folderId: string,
  path: string
}

export interface EditBookmarkSuccess {
    id: string;
    tags: string[];
    url: string;
    imageUrl?: string
    imageLabel?: string
    description?: string
    isFavourite?: boolean
    folderId: string
}

export type BookmarkAction =
  | ReturnType<typeof addBookmark>
  | ReturnType<typeof getAllBookmarks>
  | ReturnType<typeof setAllBookmarks>
  | ReturnType<typeof addBookmarkSuccess>
  | ReturnType<typeof addBookmarkToFavourite>
  | ReturnType<typeof selectBookmark>
  | ReturnType<typeof deleteBookmark>
  | ReturnType<typeof editBookmarkDetails>
  | ReturnType<typeof editBookmarkDetailsSuccess>
  | ReturnType<typeof deleteBookmarkSuccess>
  | ReturnType<typeof addBookmarkToFavouriteSuccess>
  | ReturnType<typeof setBookmarkLoader>


