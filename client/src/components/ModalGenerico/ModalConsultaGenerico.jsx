import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useStore";

export default function ModalConsultaGenerico() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalState, modalProps, setModal, actionArgs] = useModal((state) => [
    state.modalState,
    state.modalProps,
    state.setModal,
    state.actionArgs,
  ]);

  useEffect(() => {
    setIsOpen(modalState);
  }, [modalState]);

  return (
    <div
      className="ModalContainer"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <h1>{modalProps.title}</h1>
      <hr />
      <h4>{modalProps.text}</h4>
      <hr />
      <button
        className="successButton"
        onClick={() => {
          modalProps.action(...actionArgs);
          setModal();
        }}
      >
        Si
      </button>
      <button className="cancelButton" onClick={() => setModal()}>
        No
      </button>
    </div>
  );
}
