import React from "react";
import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useAuth";
import style from './ModalRolSelector.module.css'

export default function ModalConsultaGenerico() {
  const [isOpen, setIsOpen] = useState(false);
  const [setModal, modal, setUserRole] = useLogin((state) => [
    state.setModal,
    state.modal,
    state.setUserRole,
  ]);

  useEffect(() => {
    setIsOpen(modal);
  }, [modal]);

  function handleClick(role) {
    console.log(role)
    setUserRole(role);
    setModal();
  }

  return (
    <div className={`${style.modalContainer} col-md-4 px-3 py-4`} style={{ display: isOpen ? "block" : "none" }}>
      <div className="d-flex flex-column align-items-center gap-10">
        <h1 className={style.title}>¿Que buscas en la app?</h1>
        <div className="d-flex gap-15">         
          <button
            className="customer button"
            name="customer"
            onClick={() => {
              handleClick("customer");
            }}
          >
            ¡Quiero Comprar!
          </button>
          <button
            className="cancelButton button"  
            name="provider"
            onClick={() => handleClick("provider")}
          >
            ¡Quiero Vender!
          </button>
        </div>
      </div>
    </div>
  );
}
