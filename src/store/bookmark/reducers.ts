import {
  Bookmark,
  BookmarkAction,
  BookmarkActionTypes,
  BookmarkState,
} from "./types";

const initialState: BookmarkState = {
  currentBookmark: {
    id: "",
    url: "",
    imageLabel: "",
    imageUrl: "",
    description: "",
    folderId: "",
    isFavourite: false,
    isSelected: false,
  },
  availableBookmarks: [],
  selectedBookmarks: [],
  bookmarkLoader: false
};

export const bookmarkReducer = (
  state = initialState,
  action: BookmarkAction
): BookmarkState => {
  switch (action.type) {
    case BookmarkActionTypes.ADD_BOOKMARK: {
      const { url, folderId, path } = action.payload;
      return {
        ...state,
        currentBookmark: {
          ...state.currentBookmark,
          folderId: folderId,
          url: url,
          isFavourite: false,
          isSelected: false,
          path: path,
        },
      };
    }

    case BookmarkActionTypes.GET_ALL_BOOKMARKS: {
      return {
        ...state,
        bookmarkLoader: true,
      };
    }
    case BookmarkActionTypes.SET_ALL_BOOKMARKS: {
      const bookmarks = action.payload;
      console.log("Bookmarks folder Payload", action.payload);
      const stateBookmarks: Bookmark[] = bookmarks;

      stateBookmarks.forEach((bookmark) => (bookmark.isSelected = false));

      return {
        ...state,
        availableBookmarks: [...stateBookmarks],
        bookmarkLoader: false,
      };
    }

    case BookmarkActionTypes.ADD_BOOKMARK_SUCCESS: {
      const bookmarkPayload = action.payload;

      return {
        ...state,
        currentBookmark: { ...bookmarkPayload },
        availableBookmarks: [...state.availableBookmarks, bookmarkPayload],
      };
    }

    case BookmarkActionTypes.ADD_BOOKMARK_TO_FAVOURITE: {
      return {
        ...state,
      };
    }

    case BookmarkActionTypes.ADD_BOOKMARK_TO_FAVOURITE_SUCCESS: {
      const id = action.payload;
      const availableBookmarks = state.availableBookmarks;
      const bookmark = availableBookmarks.find(
        (bookmark) => bookmark.id === id
      );

      if (bookmark?.isFavourite !== undefined)
        bookmark.isFavourite = !bookmark.isFavourite;

      if (bookmark !== undefined) {
        const index = availableBookmarks.indexOf(bookmark);

        availableBookmarks[index] = { ...bookmark };
      }

      return {
        ...state,
        availableBookmarks: [...availableBookmarks],
      };
    }

    case BookmarkActionTypes.SELECT_BOOKMARK: {
      const id = action.payload;
      const availableBookmarks = state.availableBookmarks;
      const bookmark = availableBookmarks.find(
        (bookmark) => bookmark.id === id
      );

      if (bookmark?.isSelected !== undefined)
        bookmark.isSelected = !bookmark.isSelected;

      if (bookmark !== undefined) {
        const index = availableBookmarks.indexOf(bookmark);

        availableBookmarks[index] = { ...bookmark };
      }

      return {
        ...state,
        availableBookmarks: [...availableBookmarks],
      };
    }

    case BookmarkActionTypes.DELETE_BOOKMARK: {
      return {
        ...state,
      };
    }

    case BookmarkActionTypes.DELETE_BOOKMARK_SUCCESS: {
      const id = action.payload;
      const availableBookmarks = state.availableBookmarks.filter(
        (bookmark) => bookmark.id !== id
      );
      return {
        ...state,
        availableBookmarks: [...availableBookmarks],
      };
    }

    case BookmarkActionTypes.EDIT_BOOKMARK_DETAILS: {
      return {
        ...state
      }
    }

    case BookmarkActionTypes.EDIT_BOOKMARK_DETAILS_SUCCESS: {

      const data = action.payload
      const {id} = data
      const bookmark = state.availableBookmarks.find(bookmark => bookmark.id === id)
      const availableBookmarks = state.availableBookmarks


      if(bookmark !== undefined){

        const updatedBookmark = {
          ...bookmark, 
          ...data
        }
        const index = state.availableBookmarks.indexOf(bookmark)
        availableBookmarks[index] = {...updatedBookmark}
      }

      return {
        ...state,
        availableBookmarks: [...availableBookmarks]
      }
    }

    case BookmarkActionTypes.SET_BOOKMARK_LOADER: {
      return {
        ...state,
        bookmarkLoader: action.payload
      };
    }

    default:
      return { ...state };
  }
};
