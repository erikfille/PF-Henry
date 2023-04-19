import React, { useState } from "react";
import ReactStars from "react-stars";
import { useProduct } from "../../hooks/useStore";
import styles from "./ProductDetail.module.css";
import Zoom from "react-img-hover-zoom";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

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

  const [quantity, setQuantity] = useState(1);

  const [setCartAdd, setActiveCart] = useProduct((state) => [
    state.setCartAdd,
    state.setActiveCart,
  ]);

  function handleInputChange(e) {
    setQuantity(e.target.value);
  }

  function addToCart() {
    if (quantity > 0) {
      setCartAdd(_id, quantity, stock);
      setActiveCart();
    } else window.alert("Necesitas indicar una cantidad");
  }

  return (
    <div className="container mb-5">
      <div className="row gx-5">
        <div>
          <NavLink
            className={`${styles.resena} d-flex justify-content-end align-items-center gap-1 pt-3`}
            onClick={() => history.back()}
          >
            <BiArrowBack />
            Volver
          </NavLink>
        </div>
        <div
          className={`${styles.container} col-12 col-md-6 d-flex justify-content-center mt-3`}
        >
          <Zoom
            img={imagen}
            zoomScale={3}
            width={600}
            height={600}
            style={{}}
            className=""
          />
          {/* <img src={imagen} alt="productImage" className="img-fluid p-lg-4" /> */}
        </div>
        <div
          className={`${styles.container} container col-12 col-md-6 py-4 mt-3`}
        >
          <h1 className={`${styles.fColor} fw-bold`}>{titulo}</h1>
          <hr />
          <h3 className={`${styles.fColor} fw-bold fs-5`}>$ {precio}</h3>
          <ReactStars
            count={5}
            size={20}
            value={rating}
            edit={false}
            activeColor="#ffd700"
          />
          {/* <a href="#reseñar" className={styles.resena}>
            Escribe una reseña
          </a> */}
          <hr />
          <h3 className={`${styles.fColor} fw-bold fs-5`}>Descripción:</h3>
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
            <span className={`${styles.fColor} fw-bold me-3 fs-5`}>
              Categoría:
            </span>
            {categoria ? (
              <span className={`fw-bold ${styles.span}`}>
                {categoria.nombre}
              </span>
            ) : (
              <span className={`fw-bold ${styles.span}`}>
                Sin información de Categoría
              </span>
            )}
          </div>
          <div className="mb-3">
            <span className={`${styles.fColor} fw-bold me-3 fs-5`}>
              Disponibilidad:
            </span>
            <span className={`fw-bold ${styles.span}`}>{stock}</span>
          </div>
          {from !== "admin" ? (
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span className={`${styles.fColor} fw-bold me-3 fs-5`}>
                  Cantidad:
                </span>
                <input
                  placeholder="Cantidad"
                  type="number"
                  min="0"
                  max={stock}
                  name="cantidad"
                  value={quantity}
                  onChange={handleInputChange}
                  className={styles.inputNumber}
                />
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => addToCart()}
                  disabled={Number(quantity) < 0}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
