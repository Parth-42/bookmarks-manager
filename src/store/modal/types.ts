import React from "react";
import { showModal, hideModal } from "./actions";

export const ModalActionTypes = <const>{
  SHOW_MODAL: "SHOW_MODAL",
  HIDE_MODAL: "HIDE_MODAL",
};

export interface ModalState {
  isOpen: boolean;
  title: string;
  component: React.ElementType<any> | undefined;
  data: {
    [key: string]: any;
  };
  id?: string;
}

export type ShowModalPayload = Omit<ModalState, "isOpen">;

export type ModalAction =
  | ReturnType<typeof showModal>
  | ReturnType<typeof hideModal>;
