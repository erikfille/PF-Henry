import React from "react";
import { useState, useEffect } from "react";
import { useAdmin } from "../../../hooks/useStore";
import style from "./ModalEditCategory.module.css";

export default function ModalEditCategory() {
  const [isOpen, setIsOpen] = useState(false);

  const [
    setCategoryEditModal,
    categoryEditModal,
    selectedCategory,
    editCategory,
  ] = useAdmin((state) => [
    state.setCategoryEditModal,
    state.categoryEditModal,
    state.selectedCategory,
    state.editCategory,
  ]);

  const [editedCategory, setEditedCategory] = useState({
    nombre: "",
    tipo: "",
  });

  useEffect(() => {
    setEditedCategory({
      nombre: selectedCategory.nombre,
      tipo: selectedCategory.tipo,
    });
  }, [selectedCategory]);

  useEffect(() => {
    setIsOpen(categoryEditModal);
  }, [categoryEditModal]);

  const handleChange = (e) => {
    setEditedCategory({ ...editedCategory, [e.target.name]: e.target.value });
  };

  const editCategorySubmit = () => {
    editCategory(selectedCategory._id, editedCategory);
  };

  return (
    <div
      className={`${style.modalContainer} col-md-4 px-3 py-4`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className={style.addCategory}>
        <h1 className="fw-bold mb-0">Agregar nueva categoría</h1>
        <div className="mb-3 my-5 d-flex gap-30">
          <div className="name">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              placeholder="Ingresa un nombre"
              value={editedCategory.nombre}
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
              onChange={handleChange}
            />
          </div>
          <div className="tipo">
            <label htmlFor="tipo" className="form-label">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              className="form-select"
              aria-label="Default select example"
              value={editedCategory.tipo}
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
              onChange={handleChange}
            >
              <option value="Producto">Producto</option>
              <option value="Servicio">Servicio</option>
            </select>
          </div>
        </div>
        <button className="button mt-3" onClick={editCategorySubmit}>
          Modificar categoría
        </button>
        <button onClick={() => setCategoryEditModal()} className="button mt-3">
          Cancelar
        </button>
      </div>
    </div>
  );
}
