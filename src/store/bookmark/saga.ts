import axios, { AxiosResponse } from "axios";
import firebase from "firebase";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
  addBookmarkDataToFolder,
  addNewFolder,
  deleteBookmarkFromFolder,
  editBookmarkInFolders,
  setCurrentFolderDetails,
} from "../folders/actions";
import { FolderItem } from "../folders/types";
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
  setAllBookmarks,
  setBookmarkLoader,
} from "./actions";
import { AddBookmarkPayload, Bookmark, BookmarkActionTypes } from "./types";
import { createFolderRequest } from "../folders/saga";
import { toast } from "react-toastify";
import { StoreState } from "..";

function* addBookmarkSaga(action: ReturnType<typeof addBookmark>) {
  try {
    const { folderId, folderLabel, isFavourite } = action.payload;
    let updatedFolderId = folderId;
    let bookmarkItem = action.payload;
    if (folderId === "") {
      const folderItem: FolderItem = {
        id: folderId,
        title: "Document Folder 1",
        label: folderLabel,
        children: {},
        parent: {},
        path: folderLabel,
      };

      const result: FolderItem = yield call(createFolderRequest, folderItem);
      toast.success(`${result.label} created succesfully.`);
      yield put(setCurrentFolderDetails(result));
      yield put(addNewFolder(result));

      bookmarkItem = {
        ...bookmarkItem,
        isFavourite: isFavourite,
        isSelected: false,
        folderId: result.id,
      };

      updatedFolderId = result.id;
    }

    const bookmarkData: Bookmark = yield call(addBookmarkFN, bookmarkItem);

    const { id } = bookmarkData;

    yield put(addBookmarkSuccess(bookmarkData));

    const resultantData: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
      yield firebase
        .firestore()
        .collection("Folders")
        .doc(updatedFolderId)
        .set(
          {
            bookmarks: {
              [id]: true,
            },
          },
          { merge: true }
        );
    yield put(
      addBookmarkDataToFolder({
        bookmarkId: id,
        folderId: updatedFolderId,
      })
    );
    toast.success(`Bookmark created succesfully.`);
    yield put(setBookmarkLoader(false));
    console.log(resultantData);
  } catch (e) {
    yield put(setBookmarkLoader(false));
    toast.error("Could not create bookmark.");
  }
}
function* addBookmarkFN(payload: AddBookmarkPayload) {
  try {
    const { url, folderId, isFavourite } = payload;

    const store: StoreState = yield select();
    const folders = store.folder.availableFolders;
    const folder = folders.find((folder) => folder.id === folderId);

    yield put(setBookmarkLoader(true));

    const result: AxiosResponse<any> = yield axios.get(
      `http://api.linkpreview.net/?key=621e4631a94d6cabecbf39fdc3004cec&q=${url}`
    );

    const bookmarkDoc: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> =
      yield firebase.firestore().collection("Bookmarks").add({
        url: url,
        folderId: folderId,
        imageUrl: result.data.image,
        imageLabel: result.data.title,
        description: result.data.description,
        isFavourite: isFavourite,
        path: folder?.path,
      });

    console.log("BOOKMARK ID: ", bookmarkDoc.id);
    const bookmarkDocId = bookmarkDoc.id;

    const data: Bookmark = {
      folderId: folderId,
      url: url,
      id: bookmarkDocId,
      imageUrl: result.data.image,
      imageLabel: result.data.title,
      description: result.data.description,
      isFavourite: isFavourite,
      isSelected: false,
      path: folder?.path,
    };

    return data;
  } catch {
    yield put(setBookmarkLoader(false));
  }
}

function* getAllBookmarksSaga(action: ReturnType<typeof getAllBookmarks>) {
  try {
    const bookmarkData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> =
      yield firebase.firestore().collection("Bookmarks").get();
    const bookmarks: Bookmark[] = bookmarkData.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    yield put(setAllBookmarks(bookmarks));
    console.log(bookmarks);
    console.log(bookmarks[0].url);
    return bookmarks;
  } catch (e) {
    console.log(e);
  }
}

function* setFavouriteSaga(action: ReturnType<typeof addBookmarkToFavourite>) {
  try {
    const id = action.payload;

    const store: StoreState = yield select();
    const availableBookmarks = store.bookmark.availableBookmarks;
    const bookmark = availableBookmarks.find((bookmark) => bookmark.id === id);

    if (bookmark !== undefined) {
      yield put(setBookmarkLoader(true));
      yield firebase.firestore().collection("Bookmarks").doc(id).update({
        isFavourite: !bookmark.isFavourite,
      });

      yield put(addBookmarkToFavouriteSuccess(id));

      yield put(setBookmarkLoader(false));

      if (bookmark.isFavourite) {
        toast.success(`Added to Favourites.`);
      } else {
        toast.success("Removed from Favourites.");
      }
    }
  } catch (e) {
    yield put(setBookmarkLoader(false));
    toast.error("Could not add to Favourites.");
  }
}

function* deleteBookmarkSaga(action: ReturnType<typeof deleteBookmark>) {
  try {
    const id = action.payload;

    const store: StoreState = yield select();
    const availableBookmarks = store.bookmark.availableBookmarks;
    const bookmark = availableBookmarks.find((bookmark) => bookmark.id === id);

    if (bookmark !== undefined) {
      yield put(setBookmarkLoader(true));
      yield firebase
        .firestore()
        .collection("Folders")
        .doc(bookmark.folderId)
        .update({
          ["bookmarks." + id]: firebase.firestore.FieldValue.delete(),
        });

      yield firebase.firestore().collection("Bookmarks").doc(id).delete();
      yield put(deleteBookmarkSuccess(id));
      yield put(
        deleteBookmarkFromFolder({
          bookmarkId: id,
          folderId: bookmark.folderId,
        })
      );

      yield put(setBookmarkLoader(false));
      toast.success(`Bookmark deleted successfully.`);
    }
  } catch (error) {
    yield put(setBookmarkLoader(false));
    toast.error(`Bookmark deletion failed.`);
  }
}

function* editBookmarkDetailsSaga(
  action: ReturnType<typeof editBookmarkDetails>
) {
  try {
    const { id, url, isFavourite, tags, folderId, path } = action.payload;

    const store: StoreState = yield select();
    const availableBookmarks = store.bookmark.availableBookmarks;
    const bookmark = availableBookmarks.find((bookmark) => bookmark.id === id);

    let imageUrl = bookmark!.imageUrl;
    let imageLabel = bookmark!.imageLabel;
    let description = bookmark!.description;

    //GET NEW DATA
    yield put(setBookmarkLoader(true));
    if (bookmark?.url !== url) {
      const result: AxiosResponse<any> = yield axios.get(
        `http://api.linkpreview.net/?key=621e4631a94d6cabecbf39fdc3004cec&q=${url}`
      );

      imageUrl = result.data.image;
      imageLabel = result.data.title;
      description = result.data.description;
    }

    //UPDATE BOOKMARK FOLDER
    if (bookmark?.folderId !== folderId) {
      yield firebase
        .firestore()
        .collection("Folders")
        .doc(bookmark?.folderId)
        .update({
          ["bookmarks." + id]: firebase.firestore.FieldValue.delete(),
        });

      yield firebase
        .firestore()
        .collection("Folders")
        .doc(folderId)
        .set(
          {
            bookmarks: {
              [id]: true,
            },
          },
          { merge: true }
        );

      yield firebase.firestore().collection("Bookmarks").doc(id).update({
        folderId: folderId,
      });
    }

    //UPDATE BOOKMARK
    yield firebase.firestore().collection("Bookmarks").doc(id).update({
      folderId: folderId,
      url: url,
      isFavourite: isFavourite,
      imageUrl,
      imageLabel,
      description,
      path,
    });

    const data = {
      folderId,
      id: id,
      tags: tags,
      url: url,
      imageUrl,
      imageLabel,
      description,
      isFavourite,
      path,
    };

    const folderData = {
      newFolderId: folderId,
      oldFolderId: bookmark?.folderId!,
      bookmarkId: bookmark?.id!,
    };

    yield put(editBookmarkDetailsSuccess(data));
    yield put(editBookmarkInFolders(folderData));

    yield put(setBookmarkLoader(false));
    toast.success(`Bookmark Edited Successfully.`);
  } catch (error) {
    yield put(setBookmarkLoader(false));
    toast.error("Could not edit bookmark.");
  }
}

const bookmarkWatcher = [
  takeLatest(BookmarkActionTypes.ADD_BOOKMARK, addBookmarkSaga),
  takeLatest(BookmarkActionTypes.GET_ALL_BOOKMARKS, getAllBookmarksSaga),
  takeEvery(BookmarkActionTypes.ADD_BOOKMARK_TO_FAVOURITE, setFavouriteSaga),
  takeEvery(BookmarkActionTypes.DELETE_BOOKMARK, deleteBookmarkSaga),
  takeLatest(
    BookmarkActionTypes.EDIT_BOOKMARK_DETAILS,
    editBookmarkDetailsSaga
  ),
];

export default bookmarkWatcher;
