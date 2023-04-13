import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useStore";
import style from "./ModalInfoGenerico.module.css";

export default function ModalConsultaGenerico() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfoState, modalInfoProps, setModalInfo, modalInfoActionArgs] =
    useModal((state) => [
      state.modalInfoState,
      state.modalInfoProps,
      state.setModalInfo,
      state.modalInfoActionArgs,
    ]);

  useEffect(() => {
    setIsOpen(modalInfoState);
  }, [modalInfoState]);

  return (
    <div
      className={`${style.modalContainer} col-md-4 p-3`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="d-flex flex-column align-items-center gap-10">
        <h1 className={style.title}>{modalInfoProps.title}</h1>
        <h4 className={style.text}>{modalInfoProps.text}</h4>
        <div className="d-flex gap-15">
          <button
            className="button"
            onClick={() => {
              modalInfoProps.action(...modalInfoActionArgs);
              setModalInfo();
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
