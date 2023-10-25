import { combineReducers } from "redux";
import { bookmarkReducer } from "./bookmark/reducers";
import { folderReducer } from "./folders/reducers";
import { modalReducer } from "./modal/reducers";
import { tagReducer } from "./tags/reducers";

const reducers = combineReducers({
  modal: modalReducer,
  folder: folderReducer,
  bookmark: bookmarkReducer,
  tag: tagReducer,
});

export default reducers;
