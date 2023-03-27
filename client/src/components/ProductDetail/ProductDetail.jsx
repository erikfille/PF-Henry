import React, { useState } from "react";
import ReactStars from "react-stars";
import styles from "./ProductDetail.module.css";

export default function ProductDetail(props) {
  const {
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
    // Envia el estado quantity y el id del producto al carrito
  }


  return (
    <div className="productDetailContainer">
      <div>
        <img src={imagen} alt="productImage" />
      </div>
      <div className="productInfo">
        <h1>{titulo}</h1>
        <hr />
        <h2>AR$ {precio}</h2>
        <ReactStars
          count={5}
          size={20}
          value={rating}
          edit={false}
          activeColor="#ffd700"
        />
        <a href="#reseñar">Escribe una reseña</a>
        <hr />
        <h2>Descripción:</h2>
        <p>{descripcion}</p>
        <hr />
        <h2>Categoría:</h2>
        <span>
          <b>{categoria}</b>
        </span>
        <h2>Cantidad: </h2>
        <input
          type="number"
          name="cantidad"
          value={quantity}
          onChange={handleInputChange}
        />
        <button className="addToCart" onClick={() => addToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
