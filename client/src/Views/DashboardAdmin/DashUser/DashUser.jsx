import React, { useState, useEffect } from "react";
import style from "./DashUser.module.css";
import { FaEdit } from "react-icons/fa";
import { ImUserMinus } from "react-icons/im";
import { ImUserCheck } from "react-icons/im";
import { useAdmin } from "../../../hooks/useStore";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";

const DashUser = () => {
  const [inputSearch, setInputSearch] = useState("all");
  const [filter, setFilter] = useState("all");
  const [
    adminUsers,
    adminFilteredUsers,
    adminFilteredUsersWOSearch,
    selectedUser,
    usersEditModal,
    usersDetailModal,
    setUserEditModal,
    setUserDetailModal,
    getAdminUsers,
    searchAdminUsers,
    modifyUser,
    userChangeStatus,
  ] = useAdmin((state) => [
    state.adminUsers,
    state.adminFilteredUsers,
    state.adminFilteredUsersWOSearch,
    state.selectedUser,
    state.usersEditModal,
    state.usersDetailModal,
    state.setUserEditModal,
    state.setUserDetailModal,
    state.getAdminUsers,
    state.searchAdminUsers,
    state.modifyUser,
    state.userChangeStatus,
  ]);

  useEffect(() => {
    if (inputSearch.length > 0) {
      let result = [];
      adminFilteredUsersWOSearch.forEach((u) => {
        ((u.name && u.name.toLowerCase().includes(inputSearch.toLowerCase())) ||
          (u.surname &&
            u.surname.toLowerCase().includes(inputSearch.toLowerCase())) ||
          (u.email &&
            u.email.toLowerCase().includes(inputSearch.toLowerCase()))) &&
          result.push(p);
      });
      searchAdminUsers(result);
    } else if (inputSearch.length <= 0) {
      searchAdminUsers(adminFilteredUsersWOSearch);
    }
  }, [inputSearch]);

  const changeStatus = (item) => {
    let newUser = { ...item, status: item.status ? 0 : 1 };
    let userId = item._id;
    userChangeStatus(userId, newUser);
  };

  return (
    <div className={`${style.dashboardContaier} sidebar col-9 px-5`}>
      <HeaderDashboard />
      <div
        className={`${style.userBar} px-4 userbar py-4 d-flex justify-content-between align-items-center mt-5`}
      >
        <div className="type">
          <h1 className="fw-bold mb-0">Usuarios</h1>
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
            >
              <option value="all" defaultValue disabled selected>
                Selecciona
              </option>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <div
            className={`${style.search} d-flex align-items-center col col-md-6 m-1`}
          >
            <p className={`${style.p} mb-0 d-none d-lg-inline fw-bold`}>
              Buscar usuario:
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
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Estatus</th>
              <th scope="col">Detalle</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {adminFilteredUsers
              ? adminFilteredUsers.map((user) => (
                  <tr>
                    <th scope="row">1</th>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td className="status">
                      <div
                        className={`${style.status} ${
                          user.status === 1 ? style.active : style.inactive
                        } ms-4 mt-2`}
                      ></div>
                    </td>
                    <td>
                      <button
                        className={style.linkDetalle}
                        onClick={() => setUserDetailModal()}
                      >
                        Ver detalle
                      </button>
                    </td>
                    <td>
                      <div className="icons d-flex gap-10">
                        <div className="modificarActivo">
                          {user.status === 0 ? (
                            <ImUserMinus
                              title="Desactivar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                              onClick={() => changeStatus(user)}
                            />
                          ) : (
                            <ImUserCheck
                              title="Activar"
                              style={{
                                cursor: "pointer",
                                fill: "var(--color-0CC5BA)",
                              }}
                              onClick={() => changeStatus(user)}
                            />
                          )}
                        </div>
                        <div className="edit">
                          <FaEdit
                            style={{
                              cursor: "pointer",
                              fill: "var(--color-0CC5BA)",
                            }}
                            onClick={() => setUserEditModal(user._id)}
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

export default DashUser;
