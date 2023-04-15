import { useState, useEffect } from "react";
import validation from "./validation";
import UploadWidget from "../UploadWidget/UploadWidget";
import { usePets } from "../../hooks/useStore";
import axios from "axios";
import styles from "./CreatePet.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

export default function CreatePet() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [newPetData, setNewPetData] = useState({
    nombre: "",
    especie: "",
    fechaDeNacimiento: Date.now(),
    descripcion: "",
    imagen: "",
    historial: [],
  });

  const [errors, setErrors] = useState({
    nombre: "",
    especie: "",
    fechaDeNacimiento: "",
    descripcion: "",
  });

  const [petAddModal, setPetAddModal, addPet] = usePets((state) => [
    state.petAddModal,
    state.setPetAddModal,
    state.addPet,
  ]);

  async function onSubmit() {
    try {
      addPet(newPetData, user);
    } catch (err) {
      window.alert(err.error);
    }
  }

  function handleInputChange(e) {
    setNewPetData({
      ...newPetData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...newPetData,
        [e.target.name]: e.target.value,
      })
    );
  }

  function onUpload(url) {
    setNewPetData({ ...newPetData, imagen: url });
  }

  return (
    <div className="container-xl">
      <div className={`home-wrapper-2 ${styles.createProductContainer}`}>
        <h1 className=" text-center fw-bold pt-5 pb-1">
          ¡Cuentanos sobre tu mascota!
        </h1>
        <div className="container mt-5 py-4 d-flex justify-content-center mt-auto">
          <div className="row py-2">
            <form
              onSubmit={onSubmit}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="mb-3 w-100">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    value={newPetData.nombre}
                    onChange={handleInputChange}
                    className={`${errors.nombre && "is-invalid"} form-control`}
                    placeholder="Nombre de tu mascota"
                  />
                  {errors.nombre && (
                    <span className={styles.errorSpan}>
                      {errors.nombre}
                      <br />
                    </span>
                  )}
                </div>
                <br />
                <input
                  placeholder="¿A que especie pertenece?"
                  type="text"
                  name="especie"
                  value={newPetData.especie}
                  onChange={handleInputChange}
                  className={`${errors.especie && "is-invalid"} form-control`}
                />
                {errors.especie && (
                  <span className={styles.errorSpan}>
                    {errors.especie}
                    <br />
                  </span>
                )}
                <br />
                <div>
                  <DatePicker
                    locale="es"
                    dateFormat="dd/MM/yyyy"
                    selected={newPetData.fechaDeNacimiento}
                    onChange={(date) =>
                      setNewPetData({ ...newPetData, fechaDeNacimiento: date })
                    }
                    className={styles.date}
                  />
                </div>
                <br />
                <div>
                  <textarea
                    placeholder="Cuentanos un poco de tu mascota"
                    type="text"
                    name="descripcion"
                    value={newPetData.descripcion}
                    onChange={handleInputChange}
                    className={`${
                      errors.descripcion && "is-invalid"
                    } form-control`}
                  />
                  {errors.descripcion && (
                    <span
                      className={
                        newPetData.descripcion.length < 1 ||
                        newPetData.descripcion.length >= 140
                          ? styles.errorSpan
                          : styles.charactersLeft
                      }
                    >
                      {errors.descripcion}
                      <br />
                    </span>
                  )}
                </div>
                <br />
              </div>
              <div className="imgContainer ">
                <div className="widgetButton text-center">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label fw-bold"
                  >
                    Agregá una imagen de tu mascota
                  </label>
                  <UploadWidget onUpload={onUpload} />
                  <br />
                  {newPetData.imagen && (
                    <div className="uploadedImage">
                      <img src={newPetData.imagen} alt="Uploaded" width="10%" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="button mt-3"
                  disabled={Object.values(errors).length}
                >
                  Agregar Mascota
                </button>
              </div>
              <div className="floatClear"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
