import { allTagsState, TagItem, TagsActionTypes } from "./types";

export const addNewTag = (payload: TagItem) => {
  return <const>{
    type: TagsActionTypes.ADD_NEW_TAG,
    payload,
  };
};
export const addNewTagSuccess = (payload: TagItem) => {
  return <const>{
    type: TagsActionTypes.ADD_NEW_TAG_SUCCESS,
    payload,
  };
};
export const getAllTags = () => {
  return <const>{
    type: TagsActionTypes.GET_ALL_TAGS,
  };
};
export const setAllTags = (payload: allTagsState) => {
  return <const>{
    type: TagsActionTypes.SET_ALL_TAGS,
    payload,
  };
};

export const setSelectedTags = (payload: {
  data: { value: string; nodeKey: string };
  selected: boolean;
}) => {
  return <const>{
    type: TagsActionTypes.SET_SELECTED_TAGS,
    payload,
  };
};
