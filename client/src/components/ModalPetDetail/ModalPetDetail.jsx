import { useEffect, useState } from "react";
import style from "./ModalPetDetail.module.css";
import { TbPawFilled } from "react-icons/tb";
import { usePets } from "../../hooks/useStore";
import { useParams } from "react-router-dom";

const ModalPetDetail = (props) => {

  const [petDetailModal, setPetDetailModal, selectedPet] = usePets((state) => [
    state.petDetailModal,
    state.setPetDetailModal,
    state.selectedPet,
  ]);

  return (
    <div
      className={`${style.modalContainer} col-md-8 px-5 py-4`}
      style={{ display: petDetailModal ? "block" : "none" }}
    >
      <div className="boton-close d-flex justify-content-end">
        <button
          onClick={() => setPetDetailModal()}
          className={style.buttonLink}
        >
          Cerrar
        </button>
      </div>
      <div className="perfil d-flex flex-column align-items-center">
        <div className="">
          <h1 className={style.title}>{selectedPet.nombre}</h1>
        </div>
        <div className={style.circle}>
          <TbPawFilled style={{ width: "80px", height: "80px" }} />
        </div>
      </div>
      <div className="data d-flex justify-content-around">
        <div className="d-flex flex-column align-items-center">
          <p className={style.data}>Especie</p>
          <p style={{ color: "var(--body_color)" }}>{selectedPet.especie}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className={style.data}>Fecha de Nac</p>
          <p style={{ color: "var(--body_color)" }}>
            {selectedPet.fechaDeNacimiento}
          </p>
        </div>
      </div>
      <hr style={{ opacity: "1", height: "2px" }} />
      <div className="historial py-3 d-flex justify-content-center">
        <h1 style={{ color: "var(--body_color)" }}>Historial</h1>
      </div>
      {selectedPet.historial
        ? selectedPet.historial.map((h) => (
            <div className="hist1">
              <span className={style.data}>Fecha: </span> <span>{h.fecha}</span>{" "}
              <br />
              <span className={style.data}>Motivo: </span>{" "}
              <span>{h.motivo}</span>
              <p className={`${style.data} mt-3 mb-0`}>Descripción: </p>
              <p style={{ color: "var(--body_color)" }}>{h.detalle}</p>
              <hr />
            </div>
          ))
        : "No hay historial para mostrar"}
    </div>
  );
};

export default ModalPetDetail;
