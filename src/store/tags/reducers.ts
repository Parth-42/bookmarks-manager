import { TagState, TagAction, TagsActionTypes } from "./types";

const initialState: TagState = {
  currentTag: {
    label: "",
    children: {},
    parent: {},
    id: "",
  },
  rootTags: {},
  availableTags: [],
  selectedTags: [],
};

export const tagReducer = (
  state = initialState,
  action: TagAction
): TagState => {
  switch (action.type) {
    case TagsActionTypes.SET_SELECTED_TAGS: {
      const { data } = action.payload;
      const id = data.nodeKey;
      return {
        ...state,
        selectedTags: [...state.selectedTags, id],
      };
    }

    case TagsActionTypes.ADD_NEW_TAG: {
      return {
        ...state,
      };
    }
    case TagsActionTypes.ADD_NEW_TAG_SUCCESS: {
      const newTagData = action.payload;
      let hasTagChild = true;
      const tagKeys = Object.keys(newTagData.children);
      if (tagKeys.length === 0) {
        hasTagChild = false;
      }
      const id = newTagData.id!;
      return {
        ...state,
        rootTags: hasTagChild
          ? { ...state.rootTags }
          : { ...state.rootTags, [id]: true },
        availableTags: [...state.availableTags, newTagData],
      };
    }
    case TagsActionTypes.GET_ALL_TAGS: {
      return {
        ...state,
      };
    }
    case TagsActionTypes.SET_ALL_TAGS: {
      const { tags, rootTags } = action.payload;
      return {
        ...state,
        availableTags: [...state.availableTags, ...tags],
        rootTags: { ...state.rootTags, ...rootTags },
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
