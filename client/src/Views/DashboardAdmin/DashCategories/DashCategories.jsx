import React from "react";
import style from "./DashCategories.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DarkMode from "../../../components/DarkMode/DarkMode";
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCloudCheckFill } from "react-icons/bs";
import { BsCloudSlashFill } from "react-icons/bs";

import { Categories } from "../helpers/Categories";

const DashCategories = () => {
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
              name=""
              id=""
              placeholder="Ej. Juguete"
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
              <th scope="col">Estatus</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((cat) => (
              <tr>
                <th scope="row">1</th>
                <td>{cat.name}</td>
                <td>{cat.type}</td>
                <td className="status">
                  <div
                    className={`${style.status} ${
                      cat.status === "activo" ? style.active : style.inactive
                    } ms-4 mt-2`}
                  ></div>
                </td>
                <td>
                  <div className="icons d-flex gap-10">
                    <div className="modificarActivo">
                      {cat.status === "activo" ? (
                        <BsCloudSlashFill
                          style={{
                            cursor: "pointer",
                            fill: "var(--color-0CC5BA)",
                          }}
                        />
                      ) : (
                        <BsCloudCheckFill
                          style={{
                            cursor: "pointer",
                            fill: "var(--color-0CC5BA)",
                          }}
                        />
                      )}
                    </div>
                    <div className="delete">
                      <RiDeleteBin6Line
                        style={{
                          cursor: "pointer",
                          fill: "var(--color-0CC5BA)",
                        }}
                      />
                    </div>
                    <div className="edit">
                      <FaEdit
                        style={{
                          cursor: "pointer",
                          fill: "var(--color-0CC5BA)",
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={style.addCategory}>
        <h1 className="fw-bold mb-0">Agregar nueva categoría</h1>
        <div class="mb-3 my-5 d-flex gap-30">
          <div className="name">
            <label for="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Ingresa un nombre"
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
            />
          </div>
          <div className="tipo">
            <label for="nombre" className="form-label">
              Tipo
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
            >
              <option selected disabled>
                Selecciona el tipo
              </option>
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
            </select>
          </div>
        </div>
        <button className="button mt-3">Agregar categoría</button>
      </div>
    </div>
  );
};

export default DashCategories;
