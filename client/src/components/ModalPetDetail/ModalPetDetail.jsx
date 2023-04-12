import { useEffect, useState } from "react";
import style from "./ModalPetDetail.module.css";
import { TbPawFilled } from "react-icons/tb";
import { usePets } from "../../hooks/useStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

const ModalPetDetail = (props) => {
  const [petDetailModal, setPetDetailModal, selectedPet] = usePets((state) => [
    state.petDetailModal,
    state.setPetDetailModal,
    state.selectedPet,
  ]);

  const [historyModal, setHistoryModal] = useState(false);

  const [newHistory, setNewHistory] = useState({
    fecha: "",
    titulo: "",
    descripcion: "",
  });

  const fecha = new Date(selectedPet.nac);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getUTCFullYear().toString();
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  function openModal() {
    setHistoryModal(historyModal ? false : true);
  }

  function handleChange(e) {
    setNewHistory({ ...newHistory, [e.target.name]: e.target.value });
    console.log(newHistory);
  }

  function handleDate(date) {
    setNewHistory({ ...newHistory, fecha: date });
  }

  async function handleNewHistory() {
    try {
      let response = await axios.post(`/`, newHistory);
    } catch (err) {
      console.log(err);
    }
  }

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
      <button onClick={() => openModal()}>Agregar</button>
      {historyModal && (
        <>
          <hr />
          <form onSubmit={() => {}}>
            <DatePicker
              locale="es"
              dateFormat="dd/MM/yyyy"
              selected={newHistory.fecha}
              name="fecha"
              onChange={(date) => handleDate(date)}
            />
            <br />
            <input
              type="text"
              name="titulo"
              value={newHistory.titulo}
              onChange={handleChange}
              placeholder="Evento"
            />
            <br />
            <textarea
              type="text"
              name="descripcion"
              value={newHistory.descripcion}
              onChange={handleChange}
              placeholder="Describe el evento"
            />
            <br />
            <button>Agregar al Historial</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ModalPetDetail;
