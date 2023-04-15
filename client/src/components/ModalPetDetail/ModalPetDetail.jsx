import { useEffect, useState } from "react";
import style from "./ModalPetDetail.module.css";
import { TbPawFilled } from "react-icons/tb";
import { usePets } from "../../hooks/useStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import validation from "./validation";
import axios from "axios";
registerLocale("es", es);

const ModalPetDetail = () => {
  const [
    petDetailModal,
    setPetDetailModal,
    selectedPet,
    petHistory,
    getHistory,
    addNewHistory,
  ] = usePets((state) => [
    state.petDetailModal,
    state.setPetDetailModal,
    state.selectedPet,
    state.petHistory,
    state.getHistory,
    state.addNewHistory,
  ]);

  const [historyModal, setHistoryModal] = useState(false);

  const [newHistory, setNewHistory] = useState({
    fecha: Date.now(),
    titulo: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({
    fecha: "",
    titulo: "",
    descripcion: "",
  });

  const [pet, setPet] = useState({});
  const [history, setHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fecha = new Date(selectedPet.nac);
  const dia = fecha.getUTCDate().toString().padStart(2, "0");
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getUTCFullYear().toString();
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  useEffect(() => {
    setPet(selectedPet);
  }, [selectedPet]);

  useEffect(() => {
    getHistory(selectedPet.id);
  }, [selectedPet]);

  useEffect(() => {
    let history = [...petHistory];
    history.forEach((h) => {
      console.log(h.fecha);
      const fecha = new Date(h.fecha * 1000);
      console.log("fecha: ", fecha);
      // Formatear la fecha legible por la computadora en el formato dd/MM/yyyy
      const dia = fecha.getUTCDate();
      const mes = fecha.getUTCMonth() + 1; // agregar 1 porque los meses en JavaScript comienzan en 0
      const anio = fecha.getUTCFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      h.fecha = fechaFormateada;
    });
    setHistory(history);
    console.log(history);
  }, [petHistory]);

  function openModal() {
    setHistoryModal(historyModal ? false : true);
  }

  function handleChange(e) {
    setNewHistory({ ...newHistory, [e.target.name]: e.target.value });
    setErrors(
      validation({
        ...newHistory,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDate(date) {
    setNewHistory({ ...newHistory, fecha: date });
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
        <div className="mb-2">
          <h1 className={style.title}>{selectedPet.name}</h1>
        </div>
        <div
          className={selectedPet.imagen ? style.imgMascota : style.circle}
          style={{ backgroundImage: `url(${selectedPet.imagen})` }}
        >
          {!selectedPet.imagen ? (
            <TbPawFilled style={{ width: "80px", height: "80px" }} />
          ) : (
            <></>
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
      <div className="d-flex flex-column align-items-center">
        <p className={style.data}>Descripción</p>
        <p style={{ color: "var(--body_color)" }}>{selectedPet.descripcion}</p>
      </div>
      <hr style={{ opacity: "1", height: "2px" }} />
      <div className="historial py-3 d-flex justify-content-center">
        <h1 style={{ color: "var(--body_color)" }}>Historial</h1>
      </div>
      {typeof history === "object" && history.length ? (
        history.map((h) => (
          <div className="hist1">
            <span className={style.data}>Fecha: </span> <span>{h.fecha}</span>{" "}
            <br />
            <span className={style.data}>Descripción: </span>{" "}
            <span>{h.descripcion}</span>
            <hr />
          </div>
        ))
      ) : (
        <p>No hay historial para mostrar</p>
      )}
      <div className="text-center mb-4">
        <button onClick={() => openModal()} className="button">
          Agregar
        </button>
      </div>
      {historyModal && (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <form
            onSubmit={() => {}}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <DatePicker
              locale="es"
              dateFormat="dd/MM/yyyy"
              selected={newHistory.fecha}
              name="fecha"
              onChange={(date) => handleDate(date)}
              className={style.date}
            />
            <br />
            <input
              type="text"
              name="titulo"
              value={newHistory.titulo}
              onChange={handleChange}
              placeholder="Evento"
              className={`${errors.titulo && "is-invalid"} form-control`}
            />
            {errors.titulo && (
              <span className={style.errorSpan}>{errors.titulo}</span>
            )}
            <br />
            <textarea
              type="text"
              name="descripcion"
              value={newHistory.descripcion}
              onChange={handleChange}
              placeholder="Describe el evento"
              className={`${errors.descripcion && "is-invalid"} form-control`}
            />
            {errors.descripcion && (
              <span className={style.errorSpan}>{errors.descripcion}</span>
            )}
            <br />
            <button
              className="button"
              disabled={Object.values(errors).length}
              onClick={() => addNewHistory(newHistory, pet.id)}
            >
              Agregar al Historial
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModalPetDetail;
