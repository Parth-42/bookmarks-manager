import { ModalActionTypes, ModalAction, ModalState } from "./types";

const initialState: ModalState = {
  isOpen: false,
  title: "",
  component: undefined,
  data: {},
  id: "",
};

export const modalReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalActionTypes.SHOW_MODAL: {
      const { component, title, data, id } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        isOpen: true,
        data: data,
        title: title,
        id: id,
        component: component ? component : undefined,
      };
    }

    case ModalActionTypes.HIDE_MODAL: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return { ...state };
  }
};
