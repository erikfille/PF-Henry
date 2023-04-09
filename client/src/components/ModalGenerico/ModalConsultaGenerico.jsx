import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "../../hooks/useStore";
import style from './ModalConsultaGenerico.module.css';

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
      <div className={`${style.modalContainer} col-md-4 px-3 py-4`} style={{ display: isOpen ? "block" : "none" }}>
         <div className="d-flex flex-column align-items-center gap-10">
            <h1 className={style.title}>{modalProps.title}</h1>
            <h4 className={style.text}>{modalProps.text}</h4>
            <div className="d-flex gap-15">
               <button
                  className="button"
                  onClick={() => {
                  modalProps.action(...actionArgs);
                  setModal();
                  }}>
                  Si
               </button>
               <button className="button" onClick={() => setModal()}>
                  No
               </button>
            </div>
         </div>
      </div>
   );
}
