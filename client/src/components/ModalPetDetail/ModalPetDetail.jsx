import { useEffect, useState } from "react";
import style from "./ModalPetDetail.module.css";
import { TbPawFilled } from "react-icons/tb";
import { usePets } from "../../hooks/useStore";
import { useParams } from "react-router-dom";

const ModalPetDetail = () => {
  const { userId } = useParams();

  const [isOpen, setIsOpen] = useState(true);

  const [petData, setPetData] = useState({
    nombre: "",
  });

  const [petDetailModal, setPetDetailModal] = usePets((state) => [
    state.petDetailModal,
    state.setPetDetailModal,
  ]);

  useEffect(() => {
    // Busca la info de la mascota para renderizar
  });

  useEffect(() => {
    setIsOpen(petDetailModal);
  }, [petDetailModal]);

  const handlerClose = () => {
    setPetDetailModal();
  };

  return (
    <div
      className={`${style.modalContainer} col-md-8 px-5 py-4`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="boton-close d-flex justify-content-end">
        <button onClick={handlerClose} className={style.buttonLink}>
          Cerrar
        </button>
      </div>
      <div className="perfil d-flex flex-column align-items-center">
        <div className="">
          <h1 className={style.title}>{petData.nombre}</h1>
        </div>
        <div className={style.circle}>
          <TbPawFilled style={{ width: "80px", height: "80px" }} />
        </div>
      </div>
      <div className="data d-flex justify-content-around">
        <div className="d-flex flex-column align-items-center">
          <p className={style.data}>Especie</p>
          <p style={{ color: "var(--body_color)" }}>{petData.especie}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <p className={style.data}>Fecha de Nac</p>
          <p style={{ color: "var(--body_color)" }}>
            {petData.fechaDeNacimiento}
          </p>
        </div>
      </div>
      <hr style={{ opacity: "1", height: "2px" }} />
      <div className="historial py-3 d-flex justify-content-center">
        <h1 style={{ color: "var(--body_color)" }}>Historial</h1>
      </div>
      {petData.historial
        ? petData.historial.map((h) => (
            <div className="hist1">
              <span className={style.data}>Fecha:</span> <span>{h.fecha}</span>{" "}
              <br />
              <span className={style.data}>Motivo:</span>{" "}
              <span>{h.motivo}</span>
              <p className={`${style.data} mt-3 mb-0`}>Descripción:</p>
              <p style={{ color: "var(--body_color)" }}>{h.detalle}</p>
            </div>
          ))
        : null}

      <hr style={{ opacity: "1" }} />
      <div className="hist1">
        <span className={style.data}>Fecha:</span> <span>10/11/22</span> <br />
        <span className={style.data}>Motivo:</span> <span>Vacuna 2</span>
        <p className={`${style.data} mt-3 mb-0`}>Descripción:</p>
        <p style={{ color: "var(--body_color)" }}>
          Se vacuno en la Clínica Veterinaria San Francisco, por el veterinario
          Oswaldo Petrini
        </p>
      </div>
    </div>
  );
};

export default ModalPetDetail;
