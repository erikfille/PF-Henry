import React from "react";
import { useState, useEffect } from "react";
import { useAdmin } from "../../../hooks/useStore";
import PetsContainer from "../../../components/PetsContainer/PetsContainer";
import ProductCard from "../../../components/ProductCard/ProductCard";
import style from "./ModalUserDetail.module.css";
import {Modal} from "react-bootstrap"

export default function ModalUserDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const [
    setUserDetailModal,
    usersEditModal,
    usersDetailModal,
    selectedUser,
    setUserEditModal,
    userBuyedProducts,
  ] = useAdmin((state) => [
    state.setUserDetailModal,
    state.usersEditModal,
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
    <Modal show={isOpen} onHide={() => setUserDetailModal()} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <b>Detalle de Usuario</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <PetsContainer pets={userDetail.id_mascota} origin="admin" />
        <hr />
        <div>
          <b>Historial de Compras</b>
        </div>
        {products && products.length ? (
          products.map((p) => (
            <div key={p._id} className="d-flex justify-content-between align-items-center">
              <div>
                <ProductCard
                  id={p._id}
                  titulo={p.titulo}
                  imagen={p.imagen}
                  cant={p.quantity}
                  showAs="adminDetail"
                />
              </div>
              <div>
                <span className="text-end">${p.precio}</span>
              </div>
            </div>
          ))
        ) : (
          <div>El usuario no tiene productos comprados</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-15">
          <button
            className="button mt-3 mx-2"
            onClick={() => {
              setUserEditModal(selectedUser._id);
              setUserDetailModal();
            }}
          >
            Editar
          </button>
          <button onClick={() => setUserDetailModal()} className="button mt-3 mx-2">
            Volver
          </button>
        </div>
      </Modal.Footer>
    </Modal>

  );
}
