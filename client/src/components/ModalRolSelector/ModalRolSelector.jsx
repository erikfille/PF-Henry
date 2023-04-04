import React from "react";
import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useAuth";

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
    <div className="ModalContainer" style={{ display: isOpen ? "block" : "none" }}>
      <h1>¿Que buscas en la app?</h1>
      <button
        className="customer"
        name="customer"
        onClick={() => {
          handleClick("customer");
        }}
      >
        ¡Quiero Comprar!
      </button>
      <button
        className="cancelButton"  
        name="provider"
        onClick={() => handleClick("provider")}
      >
        ¡Quiero Vender!
      </button>
    </div>
  );
}
