import { ModalActionTypes, ShowModalPayload } from "./types";

export const showModal = (payload: ShowModalPayload) => {
  return <const>{
    type: ModalActionTypes.SHOW_MODAL,
    payload,
  };
};

export const hideModal = () => {
  return <const>{
    type: ModalActionTypes.HIDE_MODAL,
  };
};
