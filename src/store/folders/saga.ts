import {
  allFoldersState,
  FolderActionTypes,
  FolderItem,
  IRootFolders,
} from "./types";
import { call, put, select, takeLatest } from "redux-saga/effects";
import firebase from "firebase";
import {
  addNewFolder,
  setCurrentFolderDetails,
  deleteFolder,
  editFolder,
  setAllFolders,
  deleteFolderSuccess,
  setFolderEditLoader,
  setFolderAddLoader,
} from "./actions";
import { StoreState } from "..";
import { toast } from "react-toastify";

const folderRef = firebase.firestore().collection("Folders");
const rootRef = firebase.firestore().collection("Root");

function* createFolderSaga(action: ReturnType<typeof setCurrentFolderDetails>) {
  try {
    const folderItem = action.payload;
    yield put(setFolderAddLoader(true));
    const result: FolderItem = yield call(createFolderRequest, folderItem);
    yield put(setFolderAddLoader(false));
    toast.success(`${folderItem.label} created succesfully.`);
    // yield put(setCurrentFolderDetails(result));
    yield put(addNewFolder(result));
  } catch (error) {
    toast.error(`Could not create folder`);
  }
}

function* deleteFolderSaga(action: ReturnType<typeof deleteFolder>) {
  try {
    yield call(deleteFolderRequest, action.payload);
    yield put(deleteFolderSuccess(action.payload));
  } catch (error) {
    toast.error("Deletion request failed");
  }
}

function* editFolderSaga(action: ReturnType<typeof editFolder>) {
  try {
    const { id, label } = action.payload;
    yield put(setFolderEditLoader(true));
    yield firebase.firestore().collection("Folders").doc(id).update({
      label: label,
    });
    yield put(setFolderEditLoader(false));
    toast.success("Edit successfull");
  } catch (error) {
    toast.error("Edit request failed");
  }
}

function* getFoldersSaga() {
  try {
    const result: allFoldersState = yield call(getFoldersRequest);
    yield put(setAllFolders(result));
  } catch (error) {
    console.log(error);
  }
}

function* getFoldersRequest() {
  try {
    const folderData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = yield firebase
      .firestore()
      .collection("Folders")
      .get();
    const rootData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = yield firebase
      .firestore()
      .collection("Root")
      .get();

    const root: IRootFolders = {};
    rootData.docs.forEach((doc: any) => {
      root[doc.id] = true;
    });

    const folders: FolderItem[] = folderData.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    const payload = {
      root,
      folders,
    };

    return payload;
  } catch (error) {
    console.log(error);
  }
}

export function* createFolderRequest(payload: FolderItem) {
  const { title, label, children, id, path } = payload;

  let parentObj: { [key: string]: boolean } = {};
  if (id !== "") {
    parentObj[id] = true;
  }
  const data = {
    label: label,
    title: title,
    children: children,
    parent: parentObj,
    path: path
  };

  try {
    const docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = yield folderRef.add(
      data
    );
    let children: { [key: string]: boolean } = {};
    if (id === "") {
      if (Object.keys(data.parent).length === 0) {
        const root: IRootFolders = {};
        root[docRef.id] = true;
        rootRef.doc(docRef.id).set({
          ...root,
        });
      }
    } else {
      yield folderRef.doc(id).set(
        {
          children: {
            [docRef.id]: true,
          },
        },
        { merge: true }
      );
    }

    const sampleData: FolderItem = {
      ...data,
      id: docRef.id,
      parent: { ...parentObj },
      children: children,
    };

    return sampleData;
  } catch (error) {
    console.log(error);
  }
}

function* deleteFolderRequest(id: string) {
  try {
    const store: StoreState = yield select();
    const { availableFolders } = store.folder;
    const toBeDeleted = availableFolders.find((item) => item.id === id)!;
    const parentID = Object.keys(toBeDeleted.parent);
    console.log(parentID[0]);

    const childrenIDs = Object.keys(toBeDeleted.children);

    if (childrenIDs.length > 0) {
      yield deleteChildren(id);
    }

    if (parentID.length > 0) {
      firebase
        .firestore()
        .collection("Folders")
        .doc(parentID[0])
        .update({
          ["children." + id]: firebase.firestore.FieldValue.delete(),
        });
    } else {
      yield firebase.firestore().collection("Root").doc(id).delete();
    }

    yield firebase.firestore().collection("Folders").doc(id).delete();

    toast.success("Deletion Successfull");
  } catch (error) {
    console.log(error);
  }
}

const deleteChildren = async (id: string) => {
  //@ts-ignore
  const toBeDeleted = await folderRef
    .doc(id)
    .get()
    .then((snapshot) => snapshot.data());
  const childrenIDs = Object.keys(toBeDeleted!.children);

  if (childrenIDs.length === 0) {
    await firebase.firestore().collection("Folders").doc(id).delete();
  } else {
    for (let i = 0; i < childrenIDs.length; i++) {
      await deleteChildren(childrenIDs[i]);
      await firebase.firestore().collection("Folders").doc(id).delete();
    }
  }
};

const FolderSaga = [
  takeLatest(FolderActionTypes.GET_CURRENT_FOLDER_DETAILS, createFolderSaga),
  takeLatest(FolderActionTypes.DELETE_FOLDER, deleteFolderSaga),
  takeLatest(FolderActionTypes.EDIT_FOLDER, editFolderSaga),
  takeLatest(FolderActionTypes.GET_ALL_FOLDERS, getFoldersSaga),
];

export default FolderSaga;
