import {
  addNewTag,
  addNewTagSuccess,
  getAllTags,
  setAllTags,
  setSelectedTags,
} from "./actions";

export const TagsActionTypes = <const>{
  ADD_NEW_TAG: "ADD_NEW_TAG",
  ADD_NEW_TAG_SUCCESS: "ADD_NEW_TAG_SUCCESS",
  GET_ALL_TAGS: "GET_ALL_TAGS",
  SET_ALL_TAGS: "SET_ALL_TAGS",
  SET_SELECTED_TAGS: "SET_SELECTED_TAGS",
};

export interface TagItem {
  label: string;
  id: string;
  children: {
    [key: string]: boolean;
  };
  parent: {
    [key: string]: boolean;
  };
}

export interface IRootTags {
  [key: string]: boolean;
}

export interface TagState {
  currentTag: TagItem;
  rootTags?: IRootTags;
  availableTags: TagItem[];
  selectedTags: string[];
}

export interface allTagsState {
  rootTags?: IRootTags;
  tags: TagItem[];
  selectedTags?: string[];
}

export type TagAction =
  | ReturnType<typeof addNewTag>
  | ReturnType<typeof addNewTagSuccess>
  | ReturnType<typeof getAllTags>
  | ReturnType<typeof setAllTags>
  | ReturnType<typeof setSelectedTags>;
