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
      <div className="d-flex flex-column align-items-center gap-20">
        <h1 className={style.title}>Editar categoría</h1>
        <div className="mb-2 my-4 d-flex gap-30">
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
        <div className="d-flex gap-15">
          <button className="button mt-3 mx-2"  onClick={editCategorySubmit}>
            Aceptar
          </button>
          <button onClick={() => setCategoryEditModal()} className="button mt-3 mx-2" >
            Cancelar
          </button>
        </div>
   
      </div>
    </div>
  );
}
