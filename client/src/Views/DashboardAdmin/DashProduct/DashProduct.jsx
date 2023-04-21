import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillDashCircleFill } from "react-icons/bs";
import { useAdmin } from "../../../hooks/useStore";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";
import Loader from "../../../components/Loader/Loader";
import style from "./DashProduct.module.css";

const DashProduct = () => {
  const [loading, setLoading] = useState(true);

  const [inputSearch, setInputSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [
    adminProducts,
    adminFilteredProducts,
    adminFilteredProductsWOSearch,
    selectedProducts,
    searchAdminProducts,
    productsChangeStatus,
    setFilterProducts,
    getAdminProducts,
  ] = useAdmin((state) => [
    state.adminProducts,
    state.adminFilteredProducts,
    state.adminFilteredProductsWOSearch,
    state.selectedProducts,
    state.searchAdminProducts,
    state.productsChangeStatus,
    state.setFilterProducts,
    state.getAdminProducts,
  ]);

  useEffect(() => {
    setLoading(true);
    if (typeof adminProducts === "object" && adminProducts.length) {
      setLoading(false);
    }
  }, [adminProducts]);

  useEffect(() => {
    let filtered = adminProducts;
    if (filter !== "all") {
      filtered = filtered.filter((p) => p.activo === filter);
    }
    setFilterProducts(filtered);
  }, [filter, adminProducts]);

  useEffect(() => {
    if (inputSearch.length > 0) {
      let result = [];
      adminFilteredProductsWOSearch.forEach((p) => {
        if (
          (p.titulo &&
            p.titulo.toLowerCase().includes(inputSearch.toLowerCase())) ||
          // (p.proveedor &&
          //   p.proveedor.toLowerCase().includes(inputSearch.toLowerCase())) ||
          (p.tipo && p.tipo.toLowerCase().includes(inputSearch.toLowerCase()))
        )
          result.push(p);
      });
      searchAdminProducts(result);
    } else if (inputSearch.length <= 0) {
      searchAdminProducts(adminFilteredProductsWOSearch);
    }
  }, [inputSearch, adminFilteredProductsWOSearch]);

  const changeStatus = (item) => {
    let newItem = {
      ...item,
      activo: item.activo ? 0 : 1,
    };
    let itemId = item._id;
    productsChangeStatus(itemId, newItem);
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const handleInput = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
      <HeaderDashboard />
      <div
        className={`${style.userBar} px-4 userbar py-4 d-flex justify-content-between align-items-center mt-5`}
      >
        <div className="type">
          <h1 className="fw-bold mb-0">Productos</h1>
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
              <option
                style={{ backgroundColor: "var(--body_background)" }}
                value="all"
                defaultValue
                selected
              >
                Todos
              </option>
              <option
                style={{ backgroundColor: "var(--body_background)" }}
                value={true}
              >
                Activo
              </option>
              <option
                style={{ backgroundColor: "var(--body_background)" }}
                value={false}
              >
                Inactivo
              </option>
            </select>
          </div>
          <div
            className={`${style.search} d-flex align-items-center col col-md-6 m-1`}
          >
            <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
              Buscar producto:
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
              placeholder="Ej: Comida para Perros"
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
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Estatus</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          {loading ? (
            <Loader />
          ) : (
            <tbody>
              {adminFilteredProducts &&
                adminFilteredProducts.map((prod, idx) => (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{prod.titulo}</td>
                    <td>$ {prod.precio}</td>
                    <td>{prod.stock}</td>
                    <td className="status">
                      <div
                        className={`${style.activo} ${
                          prod.activo ? style.active : style.inactive
                        } ms-4 mt-2`}
                      ></div>
                    </td>
                    <td>
                      <div className="icons d-flex gap-10">
                        <div className="modificarActivo">
                          {prod.activo ? (
                            <BsFillDashCircleFill
                              title="Desactivar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                              onClick={() => changeStatus(prod)}
                            />
                          ) : (
                            <BsFillCheckCircleFill
                              title="Activar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                              onClick={() => changeStatus(prod)}
                            />
                          )}
                        </div>
                        <div className="edit">
                          <NavLink to={`/productos/${prod._id}/admin`}>
                            <HiMagnifyingGlass
                              title="Detalle"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                            />
                          </NavLink>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DashProduct;
