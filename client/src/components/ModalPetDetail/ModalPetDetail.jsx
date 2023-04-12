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

  const fecha = new Date(selectedPet.nac);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getUTCFullYear().toString();
  const fechaFormateada = `${dia}/${mes}/${anio}`;

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
          {selectedPet.imagen ? (
            <img
              src={selectedPet.imagen}
              alt="tu vieja en tanga, pero no"
              style={{ width: "80px", height: "80px" }}
            />
          ) : (
            <TbPawFilled style={{ width: "80px", height: "80px" }} />
          )}
        </div>
      </div>
      <div className="data d-flex justify-content-around">
        <div className="d-flex flex-column align-items-center">
          <p className={style.data}>Especie</p>
          <p style={{ color: "var(--body_color)" }}>{selectedPet.especie}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className={style.data}>Fecha de Nac</p>
          <p style={{ color: "var(--body_color)" }}>{fechaFormateada}</p>
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
      <button onClick={() => {}}>Agregar</button>
    </div>
  );
};

export default ModalPetDetail;
