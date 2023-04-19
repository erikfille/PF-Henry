import React from "react";
import { useState, useEffect } from "react";
import { useAdmin } from "../../../hooks/useStore";
import PetsContainer from "../../../components/PetsContainer/PetsContainer";
import ProductCard from "../../../components/ProductCard/ProductCard";
import style from "./ModalUserDetail.module.css";

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
    <div
      className={`${style.modalContainer} col-md-4 px-3 py-4`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="d-flex flex-column align-items-center gap-20">
        <h1 className={style.title}>
          <b>Detalle de Usuario</b>
        </h1>
        <div className="mb-2 my-4 d-flex gap-30">
          <div className="name">
            <span>
              <b>Nombre: </b>
            </span>{" "}
            <span>
              {userDetail.name} {userDetail.surname}
            </span>
          </div>
          <div className="address">
            {" "}
            <span>
              <b>Domicilio: </b>
            </span>{" "}
            <span>{userDetail.address}</span>
          </div>
          <div className="email">
            {" "}
            <span>
              <b>email: </b>
            </span>{" "}
            <span>{userDetail.email}</span>
          </div>
        </div>
        <hr />
        <div>
          <b>Mascotas</b>
        </div>
        <hr />
        <PetsContainer pets={userDetail.id_mascota} origin="admin" />
        <hr />
        {products && products.length
          ? products.map((p) => {
              <ProductCard // y por cada item renderiza una card con el estilo para el carrito.
                key={p._id}
                id={p._id}
                titulo={p.titulo}
                price={p.precio}
                imagen={p.imagen}
                cant={p.quantity}
                showAs="adminDetail"
              />;
            })
          : "El usuario no tiene productos comprados"}
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
          <button
            onClick={() => setUserDetailModal()}
            className="button mt-3 mx-2"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
