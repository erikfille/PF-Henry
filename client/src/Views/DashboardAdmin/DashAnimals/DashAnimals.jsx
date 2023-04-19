import React, { useState, useEffect } from "react";
import style from "./DashAnimals.module.css";
import { FaEdit } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillDashCircleFill } from "react-icons/bs";
import { useAdmin } from "../../../hooks/useStore";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";
import Loader from "../../../components/Loader/Loader";

const DashAnimals = () => {
  const [inputSearch, setInputSearch] = useState("");

  const [newSpecie, setNewSpecie] = useState("");

  const [loading, setLoading] = useState(true);

  const [
    searchAdminSpecies,
    adminSpecies,
    adminFilteredSpecies,
    addSpecie,
    specieChangeStatus,
    setSpecieEditModal,
    getAdminSpecies,
  ] = useAdmin((state) => [
    state.searchAdminSpecies,
    state.adminSpecies,
    state.adminFilteredSpecies,
    state.addSpecie,
    state.specieChangeStatus,
    state.setSpecieEditModal,
    state.getAdminSpecies,
  ]);

  useEffect(() => {
    setLoading(true);
    if (typeof adminSpecies === "object" && adminSpecies.length) {
      setLoading(false);
    }
  }, [adminSpecies]);

  useEffect(() => {
    if (inputSearch.length > 0) {
      let result = [];
      adminSpecies.forEach((s) => {
        s.animal.toLowerCase().includes(inputSearch.toLowerCase()) &&
          result.push(s);
      });
      searchAdminSpecies(result);
    } else if (inputSearch.length <= 0) {
      searchAdminSpecies(adminSpecies);
    }
  }, [inputSearch]);

  const handleInput = (e) => {
    setInputSearch(e.target.value);
  };

  const handleChange = (e) => {
    setNewSpecie(e.target.value);
  };

  const newSpecieSubmit = () => {
    addSpecie(newSpecie);
  };

  const changeStatus = (item) => {
    let newItem = {
      animal: item.animal,
      status: item.status ? 0 : 1,
    };
    let itemId = item._id;
    specieChangeStatus(itemId, newItem);
  };

  return (
    <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
      <HeaderDashboard />
      <div
        className={`${style.userBar} px-4 userbar py-4 d-flex align-items-center mt-5`}
      >
        <div className="type">
          <h1 className="fw-bold mb-0">Animales</h1>
        </div>
        <div className="d-flex gap-30 w-100 justify-content-end">
          <div
            className={`${style.search} d-flex align-items-center col col-md-6 m-1`}
          >
            <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
              Buscar animal:
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
              placeholder="Buscar"
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-30">
        <div className={`${style.table} col-6`}>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            {loading ? (
              <Loader />
            ) : (
              <tbody>
                {adminFilteredSpecies.length
                  ? adminFilteredSpecies.map((specie, idx) => (
                      <tr>
                        <th scope="row">{idx + 1}</th>
                        <td>{specie.animal}</td>
                        <td className="status">
                          <div
                            className={`${style.status} ${
                              specie.status === 1
                                ? style.active
                                : style.inactive
                            } ms-4 mt-2`}
                          ></div>
                        </td>
                        <td>
                          <div className="icons d-flex gap-10 ms-3">
                            <div className="modificarActivo">
                              {specie.status === 1 ? (
                                <BsFillDashCircleFill
                                  title="Desactivar"
                                  style={{
                                    cursor: "pointer",
                                    fill: "var(--color-0CC5BA)",
                                  }}
                                  onClick={() => changeStatus(specie)}
                                />
                              ) : (
                                <BsFillCheckCircleFill
                                  title="Activar"
                                  style={{
                                    cursor: "pointer",
                                    fill: "var(--color-0CC5BA)",
                                  }}
                                  onClick={() => changeStatus(specie)}
                                />
                              )}
                            </div>
                            <div className="edit">
                              <FaEdit
                                style={{
                                  cursor: "pointer",
                                  fill: "var(--color-0CC5BA)",
                                }}
                                onClick={() => setSpecieEditModal(specie)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            )}
          </table>
        </div>
        <div className={`${style.addCategory} col-5`}>
          <div>
            <h1 className="fw-bold mb-0 text-center ">Agregar nuevo animal</h1>
            <div className="mb-3 my-5 d-flex gap-30">
              <div className="name">
                <label htmlFor="especie" className="form-label fw-bold">
                  Especie:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="especie"
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
            <div className="d-flex gap-15 ">
              <button className="button mt-3 my-3" onClick={newSpecieSubmit}>
                Agregar animal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashAnimals;
