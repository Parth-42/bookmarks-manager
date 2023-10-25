import { createStore } from "redux";
import { ModalState } from "./modal/types";
import reducers from "./combinedReducers";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import rootSagas from "./rootSagas";
import { FolderState } from "./folders/types";
import { BookmarkState } from "./bookmark/types";
import { TagState } from "./tags/types";

export interface StoreState {
  modal: ModalState;
  folder: FolderState;
  bookmark: BookmarkState;
  tag: TagState;
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSagas);

export default store;
