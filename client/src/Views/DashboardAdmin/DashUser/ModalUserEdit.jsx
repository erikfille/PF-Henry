import React, { useState, useEffect } from "react";
import { useAdmin } from "../../../hooks/useStore";
import style from "./ModalUserEdit.module.css";
export default function ModalUserEdit() {
  const [isOpen, setIsOpen] = useState(false);

  const [
    usersEditModal,
    selectedUser,
    setUserEditModal,
    userChangeStatus,
    userChangeRole,
  ] = useAdmin((state) => [
    state.usersEditModal,
    state.selectedUser,
    state.setUserEditModal,
    state.userChangeStatus,
    state.userChangeRole,
  ]);

  const [editedUser, setEditedUser] = useState({
    name: "",
    surname: "",
    address: "",
    email: "",
    password: "",
    verifyPassword: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    setEditedUser(selectedUser);
    return () => {
      setEditedUser({});
    };
  }, [selectedUser]);

  useEffect(() => {
    setIsOpen(usersEditModal);
    return () => {
      setIsOpen(false);
    };
  }, [usersEditModal]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const editUserSubmit = (e) => {
    e.preventDefault();
    let user = {
      name: editedUser.name,
      surname: editedUser.surname,
      address: editedUser.address,
      status: editedUser.status,
    };
    userChangeRole(selectedUser._id, user);
    if (editedUser.role) userChangeRole(editedUser._id, editedUser.role);
  };

  return (
    <div className={`${style.modalContainer} px-3 py-4 position-fixed top-50 start-50 translate-middle col-sm-12 col-md-8`} style={{ display: isOpen ? "block" : "none" }}>
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <h1 className={style.title}>Editar Datos de Usuario</h1>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Ingresa un nombre"
                value={editedUser.name}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--body_color)",
                  border: "0.5px solid var(--border_color)",
                }}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="surname" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="surname"
                name="surname"
                placeholder="Ingresa un Apellido"
                value={editedUser.surname}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--body_color)",
                  border: "0.5px solid var(--border_color)",
                }}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                Mail
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ingresa un email"
                value={editedUser.email}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--body_color)",
                  border: "0.5px solid var(--border_color)",
                }}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Ingresa una dirección"
                value={editedUser.address}
                style={{
                  backgroundColor: "transparent",
                  color: "var(--body_color)",
                  border: "0.5px solid var(--border_color)",
                }}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                placeholder="Ingresa una contraseña"
                value={editedUser.password}
                style={{
                    backgroundColor: "transparent",
                    color: "var(--body_color)",
                    border: "0.5px solid var(--border_color)",
                  }}
                onChange={handleChange}
                />
              </div>
              <div className="role">
                <label htmlFor="role" className="form-label">
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-select"
                  aria-label="Default select example"
                  value={editedUser.role}
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--body_color)",
                    border: "0.5px solid var(--border_color)",
                  }}
                  onChange={handleChange}
                >
                  <option value="customer">Usuario</option>
                  <option value="provider">Proveedor</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
          
                <button className="button mt-3 mx-2" onClick={editUserSubmit}>
                  Aceptar
                </button>
                <button
                  onClick={() => setUserEditModal()}
                  className="button mt-3 mx-2"
                >
                  Cancelar
                </button>
            </div>
          </div>
        </div>
      </div>
  );
}
