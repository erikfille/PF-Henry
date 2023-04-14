import React, { useState, useEffect } from "react";
import style from "./DashCategories.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DarkMode from "../../../components/DarkMode/DarkMode";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillDashCircleFill } from "react-icons/bs";
import { useAdmin } from "../../../hooks/useStore";

import { Categories } from "../helpers/Categories";

const DashCategories = () => {
  const [inputSearch, setInputSearch] = useState("");

  const [newCategory, setNewCategory] = useState({
    nombre: "",
    tipo: "",
  });

  const [
    searchAdminCategories,
    adminCategories,
    adminFilteredCategories,
    addCategory,
  ] = useAdmin((state) => [
    state.searchAdminCategories,
    state.adminCategories,
    state.adminFilteredCategories,
    state.addCategory,
  ]);

  useEffect(() => {
    if (inputSearch.length > 0) {
      let result = [];
      adminCategories.forEach((c) => {
        (c.nombre.toLowerCase().includes(inputSearch.toLowerCase()) ||
          c.tipo.toLowerCase().includes(inputSearch.toLowerCase())) &&
          result.push(c);
      });
      searchAdminCategories(result);
    } else if (inputSearch.length <= 0) {
      searchAdminCategories(adminCategories);
    }
  }, [inputSearch]);

  const handleInput = (e) => {
    setInputSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const newCategorySubmit = () => {
    addCategory(newCategory);
  };

  return (
    <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
      <div className="header d-flex mt-5 align-items-center justify-content-between">
        <h1 className={`${style.h1} fw-bold mb-0`}>Dashboard Administrador</h1>
        <div className="div">
          <div className="circleUse d-flex align-items-center gap-30">
            <DarkMode />
            <FaUserCircle className={style.iconProfle} />
          </div>
        </div>
      </div>
      <div
        className={`${style.userBar} px-4 userbar py-4 d-flex align-items-center mt-5`}
      >
        <div className="type">
          <h1 className="fw-bold mb-0">Categorías</h1>
        </div>
        <div className="d-flex gap-30 w-100 justify-content-end">
          <div
            className={`${style.search} d-flex align-items-center col col-md-6 m-1`}
          >
            <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
              Buscar categoría:
            </p>
            <input
              className="form-control"
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
              type="search"
              name="search"
              id="search"
              placeholder="Ej. Juguete"
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div className={style.table}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {adminFilteredCategories.length
              ? adminFilteredCategories.map((cat, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{cat.nombre}</td>
                    <td>{cat.tipo}</td>
                    <td className="status">
                      <div
                        className={`${style.status} ${
                          cat.status === 0 ? style.active : style.inactive
                        } ms-4 mt-2`}
                      ></div>
                    </td>
                    <td>
                      <div className="icons d-flex gap-10">
                        <div className="modificarActivo">
                          {cat.status === 1 ? (
                            <BsFillDashCircleFill
                              title="Desactivar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                            />
                          ) : (
                            <BsFillCheckCircleFill
                              title="Activar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                            />
                          )}
                        </div>
                        <div className="edit">
                          <FaEdit
                            title="Editar"
                            style={{
                              cursor: "pointer",
                              fill: "var(--color-0CC5BA)",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
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
              placeholder="Ingresa un nombre"
              value={newCategory.nombre}
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
              value={newCategory.tipo}
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
              onChange={handleChange}
            >
              <option selected disabled>
                Selecciona el tipo
              </option>
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
            </select>
          </div>
        </div>
        <button className="button mt-3" onClick={newCategorySubmit}>
          Agregar categoría
        </button>
      </div>
    </div>
  );
};

export default DashCategories;
