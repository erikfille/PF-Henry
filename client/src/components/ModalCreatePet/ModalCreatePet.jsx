import { useEffect, useState } from "react";
import style from "./ModalCreatePet.module.css";
import { TbPawFilled } from "react-icons/tb";
import { usePets } from "../../hooks/useStore";
import { useParams } from "react-router-dom";
import CreatePet from "../CreatePet/CreatePet";

const ModalCreatePet = (props) => {

  const [petAddModal, setPetAddModal] = usePets((state) => [
    state.petAddModal,
    state.setPetAddModal,
  ]);

  return (
    <div
      className={`${style.modalContainer} col-md-8 px-5 py-4`}
      style={{ display: petAddModal ? "block" : "none" }}
    >
      <div className="boton-close d-flex justify-content-end">
        <button onClick={() => setPetAddModal()} className={style.buttonLink}>
          Cerrar
        </button>
      </div>
      <CreatePet />
    </div>
  );
};

export default ModalCreatePet;
