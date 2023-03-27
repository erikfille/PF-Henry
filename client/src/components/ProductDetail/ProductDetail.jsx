import React, { useState } from "react";
import ReactStars from "react-stars";
import styles from "./ProductDetail.module.css";

export default function ProductDetail(props) {
  const {
    _id,
    titulo,
    descripcion,
    tipo,
    precio,
    imagen,
    rating,
    stock,
    categoria,
    proveedor,
  } = props.productDetail;

  const [quantity, setQuantity] = useState(0);

  function handleInputChange(e) {
    setQuantity(e.target.value);
  }

  function addToCart() {
    setCart(_id, quantity);
    setActiveCart();
    // Envia el estado quantity y el id del producto al carrito
  }

  return (
    <div className="container mb-5">
      <div className="row mt-3 gx-5">
        <div className="col-12 col-md-6 bg-white py-4 rounded-3 d-flex align-items-center">
          <img src={imagen} alt="productImage" className="img-fluid" />
        </div>
        <div className="container col-12 col-md-6 bg-white py-4 rounded-3">
          <h1 className="fw-bold">{titulo}</h1>
          <hr />
          <h3 className="fw-bold fs-5">AR$ {precio}</h3>
          <ReactStars
            count={5}
            size={20}
            value={rating}
            edit={false}
            activeColor="#ffd700"
          />
          <a href="#reseñar" className="fw-bold">
            Escribe una reseña
          </a>
          <hr />
          <h3 className="fw-bold fs-5">Descripción:</h3>
          {descripcion ? (
            <p className="fw-light">
              <small>{descripcion}</small>
            </p>
          ) : (
            <p>
              <small>No hay información del producto</small>
            </p>
          )}
          <hr />
          <div className="mb-3">
            <span className="fw-bold me-3 fs-5">Categoría:</span>
            <span className={`fw-bold ${styles.span}`}>{categoria}</span>
          </div>
          <div className="mb-3">
            <span className="fw-bold me-3 fs-5">Tipo:</span>
            <span className={`fw-bold ${styles.span}`}>{animal}</span>
          </div>
          <div className="mb-3">
            <span className="fw-bold me-3 fs-5">Disponibilidad:</span>
            <span className={`fw-bold ${styles.span}`}>{stock}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span className="fw-bold me-3 fs-5">Cantidad:</span>
              <input
                placeholder="Cantidad"
                type="number"
                name="cantidad"
                value={quantity}
                onChange={handleInputChange}
                className={styles.inputNumber}
              />
            </div>
            <div>
              <button className="button" onClick={() => addToCart}>
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
