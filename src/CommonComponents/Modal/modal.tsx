import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./modal.css";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { ModalActionTypes } from "../../store/modal/types";

export const Modal = () => {
  const outerRef = React.useRef(null);

  const dispatch = useDispatch();
  const open = useSelector((state: StoreState) => state.modal.isOpen);
  const Child = useSelector((state: StoreState) => state.modal.component);
  const title = useSelector((state: StoreState) => state.modal.title);

  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outerRef.current) {
      dispatch({ type: ModalActionTypes.HIDE_MODAL });
    }
  };

  return open ? (
    <div className={"modal"}>
      <div
        ref={outerRef}
        className={"modal__overlay"}
        onClick={handleCloseOnOverlay}
      />
      <div className={"modal__box"}>
        <CloseIcon
          style={{ color: "gray" }}
          fontSize="small"
          className={"modal__close"}
          onClick={() => {
            dispatch({ type: ModalActionTypes.HIDE_MODAL });
          }}
        />
        {title ? <div className={"modal__title"}>{title}</div> : <></>}
        <div className={"modal__content"}>{Child ? <Child /> : <></>}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
