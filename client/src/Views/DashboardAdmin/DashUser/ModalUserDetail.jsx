import React from "react";
import { useState, useEffect } from "react";
import { useAdmin } from "../../../hooks/useStore";
import PetsContainer from "../../../components/PetsContainer/PetsContainer";
import ProductCard from "../../../components/ProductCard/ProductCard";
import style from "./ModalUserDetail.module.css";
import { Modal } from "react-bootstrap";

export default function ModalUserDetail() {

  const [isOpen, setIsOpen] = useState(false);

  const [
    setUserDetailModal,
    usersDetailModal,
    selectedUser,
    setUserEditModal,
    userBuyedProducts,
  ] = useAdmin((state) => [
    state.setUserDetailModal,
    state.usersDetailModal,
    state.selectedUser,
    state.setUserEditModal,
    state.userBuyedProducts,
  ]);

  const [userDetail, setUserDetail] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(userBuyedProducts);
    console.log(userBuyedProducts);
  }, [userBuyedProducts]);

  useEffect(() => {
    setUserDetail(selectedUser);
    console.log(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    setIsOpen(usersDetailModal);
  }, [usersDetailModal]);

  return (
    <Modal show={isOpen} onHide={() => setUserDetailModal()} className={style.modalContainer} >
      <Modal.Header closeButton className={style.modalColor}>
        <Modal.Title>
          <b>Detalle de Usuario</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={style.modalColor}>
        <div>
          <span>
            <b>Nombre: </b>
          </span>{" "}
          <span>
            {userDetail.name} {userDetail.surname}
          </span>
        </div>
        <div>
          {" "}
          <span>
            <b>Domicilio: </b>
          </span>{" "}
          <span>{userDetail.address}</span>
        </div>
        <div>
          {" "}
          <span>
            <b>email: </b>
          </span>{" "}
          <span>{userDetail.email}</span>
        </div>
        <hr />
        <div>
          <b>Mascotas</b>
        </div>
        <br />
        <div className="d-flex flex-column align-items-center gap-30 ms-5">
          <PetsContainer pets={userDetail.id_mascota} origin="admin" />
        </div>
        <hr />
        <div className="mb-2">
          <b>Historial de Compras</b>
        </div>
        {products && products.length ? (
          products.map((p) => (
            <div
              key={p._id}
              className="d-flex justify-content-center align-items-center"
            >
              <div>
                <ProductCard
                  id={p._id}
                  titulo={p.titulo}
                  imagen={p.imagen}
                  cant={p.quantity}
                  showAs="adminDetail"
                />
              </div>
              <span className="text-end">${p.precio}</span>
            </div>
          ))
        ) : (
          <div>El usuario no tiene productos comprados</div>
        )}
      </Modal.Body>
      <Modal.Footer className={style.modalColor}>
        <div className="d-flex gap-30 justify-content-between">
          <button
            className="button"
            onClick={() => {
              setUserEditModal(selectedUser._id);
              setUserDetailModal();
            }}
          >
            Editar
          </button>
          <button onClick={() => setUserDetailModal()} className="button">
            Volver
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
