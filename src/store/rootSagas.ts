import { all } from "redux-saga/effects";
import folderWatcher from "./folders/saga";
import bookmarkWatcher from "./bookmark/saga";
import tagWatcher from "./tags/saga";

const tasks = [...folderWatcher, ...bookmarkWatcher, ...tagWatcher];
const rootSaga = function* rootSaga() {
  yield all(tasks);
};
export default rootSaga;
