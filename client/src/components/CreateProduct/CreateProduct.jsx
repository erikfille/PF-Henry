import { useState, useEffect } from "react";
import validation from "./validation";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import UploadWidget from "./UploadWidget";
import axios from "axios";

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

  let productCategories = [
    { value: "categorias.a", label: "Juguete" },
    { value: "categorias.b", label: "Alimento" },
    { value: "categorias.c", label: "Golosinas" },
  ];

  let servicesCategories = [
    { value: "categorias.a", label: "Consulta" },
    { value: "categorias.b", label: "Paseo" },
    { value: "categorias.c", label: "Baño" },
    { value: "categorias.d", label: "Guarderia" },
  ];

  useEffect(() => {
    // Trae todas las categorias de producto desde el back y guarda las de productos y las de servicios
    let response = axios.get("/categorias")
    console.log('categorias: ', response)
  });

  async function createProduct(data) {
    try {
      const response = await axios.post(`/crearProducto`, data);
      console.log(response);
    } catch (err) {
      window.alert(err.error);
    }
  }

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

  function handleSelectChange(e) {
    console.log(productData.tipo);
    let selected;
    if (typeof e === "object" && e.length) {
      selected = e.map((el) => ({ ...el, value: el.value.split(".")[0] }));
      setProductData({
        ...productData,
        [selected[0].value]: selected.map((el) => el.label),
      });
    }
    if (typeof e === "object" && !e.length) {
      selected = { ...e, value: e.value.split(".")[0] };
      setProductData({
        ...productData,
        [selected.value]: selected.label,
      });
    }
    console.log(selected);
  }

  async function handleSubmit() {
    e.preventDefault();
    // getProveedor()
    console.log(productData);
    await createProduct(productData);
    /*
    - Agrego la propiedad Proveedor, sacando el id de proveedor desde el token de localStorage
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
            <Select
              name="tipo"
              options={[
                { value: "tipo.a", label: "Producto" },
                { value: "tipo.b", label: "Servicio" },
              ]}
              className="basic-select"
              placeholder="Tipo de Producto"
              onChange={handleSelectChange}
            />
            <br />
            <textarea
              placeholder={
                productData.tipo === "Producto"
                  ? "Descripción del Producto"
                  : "Descripción del Servicio"
              }
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
            <label htmlFor="precio">Precio</label>
            <input
              placeholder="Precio"
              type="number"
              name="precio"
              value={productData.precio}
              onChange={handleInputChange}
            />
            <br />
            {productData.tipo === "Producto" ? (
              <label htmlFor="stock">Stock</label>
            ) : (
              ""
            )}
            {productData.tipo === "Producto" ? (
              <input
                placeholder="Cantidad de Stock"
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
              />
            ) : (
              ""
            )}
            <br />

            <Select
              isMulti
              isSearchable={true}
              isDisabled={productData.tipo ? false : true}
              name="categorias"
              options={
                productData.tipo === "Producto"
                  ? productCategories
                  : servicesCategories
              }
              className="basic-multi-select"
              placeholder="Categorías"
              onChange={handleSelectChange}
            />
            <br />
          </div>
          <div className="imgContainer">
            <div className="widgetButton">
              <UploadWidget onUpload={onUpload} />
              <br />
              {productData.imagen && (
                <div className="uploadedImage">
                  <img src={productData.imagen} alt="Uploaded" width="30%" />
                </div>
              )}
            </div>
            {errors.state ? (
              <button className="disabledButton" disabled>
                <span>Crear Producto</span>
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
