import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useStore";
import style from './ModalPago.module.css';

export default function ModalPago({ fromPaypal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPagoState, modalPagoProps, setModalPago] = useModal((state) => [
    state.modalPagoState,
    state.modalPagoProps,
    state.setModalPago,

  ]);

  useEffect(() => {
    setIsOpen(modalPagoState);
  }, [modalPagoState]);

  return (
    <div className={`${style.modalContainer} col-md-4 p-3`} style={{ display: isOpen ? "block" : "none" }}>
      <div className="d-flex flex-column align-items-center gap-10">
        <h1 className={style.title}>{modalPagoProps.title}</h1>
        <h4 className={style.text}>{modalPagoProps.text}</h4>

          <div className="d-flex gap-15">
          <button className="button" onClick={() => setModalPago()}>
              Cancelar
            </button>
          
          </div>
  

        {console.log("Evalua a:", !fromPaypal)}
      </div>
    </div>
  );
}
