import React, { useState, useEffect } from "react";
import style from "./DashProvider.module.css";
import { FaEdit } from "react-icons/fa";
import { ImUserMinus } from "react-icons/im";
import { ImUserCheck } from "react-icons/im";
import { useAdmin } from "../../../hooks/useStore";
import { BsFillBoxSeamFill } from "react-icons/bs";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";

const DashProvider = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);

  const [
    adminProviders,
    adminFilteredProviders,
    adminFilteredProvidersWOSearch,
    selectedProvider,
    providersEditModal,
    getAdminProviders,
    searchAdminProviders,
    filterAdminProviders,
    modifyProvider,
    providerChangeStatus,
  ] = useAdmin((state) => [
    state.adminProviders,
    state.adminFilteredProviders,
    state.adminFilteredProvidersWOSearch,
    state.selectedProvider,
    state.providersEditModal,
    state.getAdminProviders,
    state.searchAdminProviders,
    state.filterAdminProviders,
    state.modifyProvider,
    state.providerChangeStatus,
  ]);

  useEffect(() => {
    setLoading(true);
    if (typeof adminProviders === "object" && adminProviders.length) {
      setLoading(false);
    }
  }, [adminProviders]);

  useEffect(() => {
    if (inputSearch.length > 0) {
      let result = [];
      adminFilteredProvidersWOSearch.forEach((p) => {
        ((p.nombre &&
          p.nombre.toLowerCase().includes(inputSearch.toLowerCase())) ||
          (p.pais &&
            p.pais.toLowerCase().includes(inputSearch.toLowerCase())) ||
          (p.subscripcion &&
            p.subscripcion
              .toLowerCase()
              .includes(inputSearch.toLowerCase()))) &&
          result.push(p);
      });
      searchAdminProviders(result);
    } else if (inputSearch.length <= 0) {
      searchAdminProviders(adminFilteredProvidersWOSearch);
    }
  }, [inputSearch, adminFilteredProvidersWOSearch]);

  useEffect(() => {
    let filtered = adminProviders;
    if (filter !== "all") {
      if (filter === "1" || filter === "0") {
        filtered = filtered.filter((p) => p.status === Number(filter));
      }
      if (filter === "platinum" || filter === "gold" || filter === "silver") {
        filtered = filtered.filter(
          (p) => p.subscripcion.toLowerCase() === filter.toLowerCase()
        );
      }
    }
    filterAdminProviders(filtered);
  }, [filter]);

  const handleInput = (e) => {
    setInputSearch(e.target.value);
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const changeStatus = (item) => {
    let newProvider = { ...item, status: item.status ? 0 : 1 };
    let providerId = item._id;
    providerChangeStatus(providerId, newProvider);
  };

  return (
    <div className={`${style.dashboardContaier} dashboard col-9 px-5`}>
      <HeaderDashboard />
      <div
        className={`${style.userBar} px-4 userbar py-4 d-flex justify-content-between align-items-center mt-5`}
      >
        <div className="type">
          <h1 className="fw-bold mb-0">Proveedores</h1>
        </div>
        <div className="d-flex gap-30">
          <div className={`${style.filter} d-flex align-items-center`}>
            <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
              Filtrar por:
            </p>
            <select
              className="form-control form-select"
              style={{
                backgroundColor: "transparent",
                color: "var(--body_color)",
                border: "0.5px solid var(--border_color)",
              }}
              name="filtrar_por"
              id="filtrar_por"
              onChange={handleChange}
            >
              <option style={{ backgroundColor: "var(--body_background)", }} value="all" defaultValue selected>
                Todos
              </option>
              <option style={{ backgroundColor: "var(--body_background)", }} value="1">Activo</option>
              <option style={{ backgroundColor: "var(--body_background)", }} value="0">Inactivo</option>
              <option style={{ backgroundColor: "var(--body_background)", }} value="silver">Silver</option>
              <option style={{ backgroundColor: "var(--body_background)", }} value="gold">Gold</option>
              <option style={{ backgroundColor: "var(--body_background)", }} value="platinum">Platinum</option>
            </select>
          </div>
          <div
            className={`${style.search} d-flex align-items-center col col-md-6 m-1`}
          >
            <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
              Buscar proveedor:
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
              value={inputSearch}
              onChange={handleInput}
              placeholder="Ej. Juan"
            />
          </div>
        </div>
      </div>
      <div className={style.table}>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Razon Social</th>
              <th scope="col">Email</th>
              <th scope="col">Locacion</th>
              <th scope="col">Estatus</th>
              <th scope="col">Suscripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {adminFilteredProviders.length
              ? adminFilteredProviders.map((prov, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{prov.nombre}</td>
                    <td>{prov.email}</td>
                    <td>{prov.pais}</td>
                    <td className="status">
                      <div
                        className={`${style.status} ${
                          prov.status === 1 ? style.active : style.inactive
                        } ms-4 mt-2`}
                      ></div>
                    </td>
                    <td>
                      <p className="mb-0">{prov.subscripcion}</p>
                    </td>
                    <td>
                      <div className="icons d-flex gap-10">
                        <div className="modificarActivo">
                          {prov.status === 1 ? (
                            <ImUserMinus
                              title="Desactivar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                              onClick={() => changeStatus(prov)}
                            />
                          ) : (
                            <ImUserCheck
                              title="Activar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                              onClick={() => changeStatus(prov)}
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
                        <div className="product">
                          <BsFillBoxSeamFill
                            title="Ver Productos"
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
    </div>
  );
};

export default DashProvider;
