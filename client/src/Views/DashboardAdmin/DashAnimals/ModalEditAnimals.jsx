import React from "react";
import { useState, useEffect } from "react";
import { useAdmin } from "../../../hooks/useStore";
import style from "./ModalEditAnimals.module.css";

export default function ModalEditAnimals() {
  const [isOpen, setIsOpen] = useState(false);

  const [setSpecieEditModal, speciesEditModal, selectedSpecie, editSpecie] =
    useAdmin((state) => [
      state.setSpecieEditModal,
      state.speciesEditModal,
      state.selectedSpecie,
      state.editSpecie,
    ]);

  const [editedSpecie, setEditedSpecie] = useState({
    animal: "",
  });

  useEffect(() => {
    setEditedSpecie({
      animal: selectedSpecie.animal,
    });
  }, [selectedSpecie]);

  useEffect(() => {
    setIsOpen(speciesEditModal);
  }, [speciesEditModal]);

  const handleChange = (e) => {
    setEditedSpecie({ ...editedSpecie, [e.target.name]: e.target.value });
  };

  const editSpecieSubmit = () => {
    editCategory(selectedSpecie._id, editedSpecie);
  };

  return (
    <div
      className={`${style.modalContainer} col-md-4 px-3 py-4`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className={style.addCategory}>
        <h1 className="fw-bold mb-0">Agregar nuevo animal</h1>
        <div className="mb-3 my-5 d-flex gap-30">
          <div className="name">
            <label htmlFor="especie" className="form-label fw-bold">
              Especie:
            </label>
            <input
              type="text"
              className="form-control"
              id="animal"
              name="animal"
              value={editedSpecie.animal}
              placeholder="Ingresa la especie"
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="button mt-3" onClick={editSpecieSubmit}>
          Modificar especie
        </button>
        <button onClick={() => setSpecieEditModal()} className="button mt-3">
          Cancelar
        </button>
      </div>
    </div>
  );
}
