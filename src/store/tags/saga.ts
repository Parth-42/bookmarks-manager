import firebase from "firebase";
import { call, put, takeLatest } from "redux-saga/effects";
import { addNewTag, addNewTagSuccess, setAllTags } from "./actions";
import { allTagsState, IRootTags, TagItem, TagsActionTypes } from "./types";

function* addNewTagSaga(action: ReturnType<typeof addNewTag>) {
  try {
    const tagItem = action.payload;
    const addedTagDetails: TagItem = yield call(createTagRequest, tagItem);
    yield put(addNewTagSuccess(addedTagDetails));
    console.log(addedTagDetails);
  } catch (e) {
    console.log(e);
  }
}

function* createTagRequest(payload: TagItem) {
  const { label, children, parent } = payload;
  const data = {
    label: label,
    children: children,
    parent: parent,
  };
  try {
    const tagDocRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = yield firebase
      .firestore()
      .collection("Tags")
      .add({
        ...data,
      });

    yield firebase
      .firestore()
      .collection("Root Tags")
      .doc(tagDocRef.id)
      .set({
        [tagDocRef.id]: true,
      });
    const finalData: TagItem = {
      label: label,
      parent: parent,
      children: {},
      id: tagDocRef.id,
    };
    return finalData;
  } catch (e) {
    console.log(e);
  }
}
function* getAllTagsSaga() {
  try {
    const result: allTagsState = yield call(getTagsRequest);
    yield put(setAllTags(result));
  } catch (error) {
    console.log(error);
  }
}
function* getTagsRequest() {
  try {
    const tagData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = yield firebase
      .firestore()
      .collection("Tags")
      .get();
    const rootData: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = yield firebase
      .firestore()
      .collection("Root Tags")
      .get();

    const rootTags: IRootTags = {};
    rootData.docs.forEach((doc: any) => {
      rootTags[doc.id] = true;
    });

    const tags: TagItem[] = tagData.docs.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    });

    const payload = {
      rootTags,
      tags,
    };

    return payload;
  } catch (error) {
    console.log(error);
  }
}

const tagWatcher = [
  takeLatest(TagsActionTypes.ADD_NEW_TAG, addNewTagSaga),
  takeLatest(TagsActionTypes.GET_ALL_TAGS, getAllTagsSaga),
];

export default tagWatcher;
