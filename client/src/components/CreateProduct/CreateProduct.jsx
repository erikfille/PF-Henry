import { useState, useEffect } from "react";
import validation from "./validation";
import CreatableSelect from 'react-select/creatable';
import UploadWidget from "./UploadWidget"

export default function CreateProduct() {
  const [productData, setProductData] = useState({
    titulo: "",
    tipo: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    stock: 0,
    categorias: [],
    proveedor: "",
  });

  const [errors, setErrors] = useState({
    titulo: "",
    tipo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
  });

  let productCategories = ["Juguete", "Alimento", "Golosina"];
  let servicesCategories = ["Consulta", "Paseo", "Baño"];

  useEffect(() => {
    // Trae todas las categorias de producto desde el back y guarda las de productos y las de servicios
  });

  function handleInputChange(e) {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...productData,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    /*
    - Agrego la propiedad Proveedor, sacando el id de proveedor desde el token de localStorage
    - Agrego la propiedad Imagen
    - Guardado de la info
    - Posteo la info
    */
  }

  function onUpload(url) {
    setProductData({ ...productData, imagen: url });
  }

  async function createProduct() {
    // Hace el post al back
  }

  return (
    <div className="formContainer">
      <h1>Creación de Producto / Servicio</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="productDataContainer">
            <input
              placeholder="Nombre del Producto"
              type="text"
              name="titulo"
              value={productData.titulo}
              onChange={handleInputChange}
              className={errors.titulo ? "danger" : "formInput"}
            />
            {errors.titulo && (
              <span className="errorSpan">
                {errors.titulo}
                <br />
              </span>
            )}
            <br />
            <select
              placeholder="Tipo de Producto"
              type="number"
              name="tipo"
              value={productData.tipo}
              onChange={handleInputChange}
              className={errors.tipo ? "danger" : "formInput"}
            >
              <option value="Producto">Producto</option>
              <option value="Servicio">Servicio</option>
            </select>
            <br />
            <textarea
              placeholder="Descripción del Producto"
              type="text"
              name="descripcion"
              value={productData.descripcion}
              onChange={handleInputChange}
              className={
                errors.descripcion && errors.state ? "danger" : "formInput"
              }
            />
            {errors.descripcion && (
              <span
                className={
                  productData.descripcion.length < 1 ||
                  productData.descripcion.length >= 140
                    ? "errorSpan"
                    : "charactersLeft"
                }
              >
                {errors.descripcion}
                <br />
              </span>
            )}
            <br />

            <input
              placeholder="Precio"
              type="number"
              name="precio"
              value={productData.precio}
              onChange={handleInputChange}
            />
            <br />

            {productData.tipo === "Servicio" ? (
              <input
                placeholder="Cantidad de Stock"
                type="number"
                name="precio"
                value={productData.precio}
                onChange={handleInputChange}
              />
            ) : (
              ""
            )}
            <br />

            <CreatableSelect
              isMulti
              isSearchable={true}
            //   defaultValue={[colourOptions[2], colourOptions[3]]}
              name="colors"
              options={productData.tipo === "Productos" ? productCategories : servicesCategories}
              className="basic-multi-select"
              classNamePrefix="select"
            />
            <br />
          </div>
          <div className="imgContainer">
            <div className="widgetButton">
              <UploadWidget onUpload={onUpload} />
              <br />
              {productData.imagen && (
                <div className="uploadedImage">
                  <img src={productData.imagen} alt="Uploaded" width="1vw" />
                </div>
              )}
            </div>
            {errors.state ? (
              <button className="disabledButton" disabled>
                <span>Submit Recipe</span>
              </button>
            ) : (
              <button className="submitButton">
                <span>Crear Producto</span>
              </button>
            )}
          </div>
          <div className="floatClear"></div>
        </form>
      </div>
    </div>
  );
}
