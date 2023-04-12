import { useState, useEffect } from "react";
import validation from "./validation";
import Select from "react-select";
import UploadWidget from "../UploadWidget/UploadWidget";
import { useProduct } from "../../hooks/useStore";
import axios from "axios";

import Meta from "../Meta/Meta";
import BreadCrump from "../BreadCrump/BreadCrump";
import styles from "./CreateProducto.module.css";

export default function CreateProduct() {
  const [newPetData, setnewPetData] = useState({
    nombre: "",
    especie: "",
    fechaDeNacimiento: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({
    titulo: "",
    tipo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
  });

  const [newPet, petAddModal, setPetAddModal] = usePets((state) => [
    state.newPet,
    state.petAddModal,
    state.setPetAddModal,
  ]);

  useEffect(() => {}, []);

  async function createPet(data) {
    try {
      const response = await axios.post(`/mascotas/${userId}`, data);
      console.log(response);
    } catch (err) {
      window.alert(err.error);
    }
  }

  function handleInputChange(e) {
    setnewPetData({
      ...newPetData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...newPetData,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectChange(e) {
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
  }

  async function handleSubmit(e) {
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
      <Meta title={"Contacto"} />
      <BreadCrump title="Crear producto" />

      <div className={` home-wrapper-2 ${styles.creaateProductContainer}`}>
        <h1 className=" text-center fw-bold pt-5 pb-1">
          ¡Registrá aquí tu producto o servicio y crecé de la mano de
          PetsAmerica!
        </h1>

        <div className="container mt-5 bg-white py-4 d-flex justify-content-center mt-auto">
          <div className="row py-2">
            <form
              onSubmit={handleSubmit}
              classname="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="mb-3 ">
                <div>
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label fw-bold"
                  >
                    Indicá si es un producto o servicio
                  </label>
                  <Select
                    name="tipo"
                    placeholder="Seleccioná producto o servicio"
                    className={`accordion-item my-4 ${styles.selectContainer}`}
                    options={[
                      { value: "tipo.a", label: "Producto" },
                      { value: "tipo.b", label: "Servicio" },
                    ]}
                    onChange={handleSelectChange}
                  />
                </div>

                <br />

                <div>
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label fw-bold"
                  >
                    Nombre de tu{" "}
                    {productData.tipo === "Producto" ? "producto" : "servicio"}
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={productData.titulo}
                    onChange={handleInputChange}
                    className={`${
                      errors.titulo ? "danger" : "formInput"
                    } form-control`}
                    placeholder={`Ingresa aquí el nombre de tu ${
                      productData.tipo === "Producto" ? "producto" : "servicio"
                    }`}
                  />
                  {errors.titulo && (
                    <span className="errorSpan">
                      {errors.titulo}
                      <br />
                    </span>
                  )}
                </div>

                <br />

                <div>
                  <label
                    htmlFor="formGroupExampleInput"
                    className="form-label fw-bold"
                  >
                    Descripción
                  </label>
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
                    className={`${
                      errors.descripcion && errors.state
                        ? "danger"
                        : "formInput"
                    } form-control `}
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
                </div>

                <br />

                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    class="form-label fw-bold"
                  >
                    Indicá el precio del{" "}
                    {productData.tipo === "Producto" ? "producto" : "servicio"}
                  </label>
                  <input
                    placeholder="Precio"
                    type="number"
                    name="precio"
                    value={productData.precio}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>

                <br />

                <div>
                  {productData.tipo === "Producto" ? (
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      class="form-label fw-bold"
                    >
                      Stock disponible
                    </label>
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
                      className="form-control"
                    />
                  ) : (
                    ""
                  )}
                </div>

                <br />

                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label fw-bold"
                  >
                    Seleccioná las categorías en las que querés que se publique
                    tu{" "}
                    {productData.tipo === "Producto" ? "producto" : "servicio"}
                  </label>
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
                    className={`accordion-item my-4 ${styles.questionContainer}`}
                    placeholder="Categorías"
                    onChange={handleSelectChange}
                  />
                </div>

                <br />
              </div>

              <div className="imgContainer ">
                <div className="widgetButton">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label fw-bold"
                  >
                    Agregá una imagen de tu{" "}
                    {productData.tipo === "Producto" ? "producto" : "servicio"}
                  </label>
                  <UploadWidget onUpload={onUpload} />
                  <br />
                  {productData.imagen && (
                    <div className="uploadedImage">
                      <img
                        src={productData.imagen}
                        alt="Uploaded"
                        width="10%"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                {errors.state ? (
                  <button className="disabledButton" disabled>
                    <span>
                      Crear{" "}
                      {productData.tipo === "Producto"
                        ? "producto"
                        : "servicio"}
                    </span>
                  </button>
                ) : (
                  <button className="submitButton">
                    <span>
                      Crear{" "}
                      {productData.tipo === "Producto"
                        ? "producto"
                        : "servicio"}
                    </span>
                  </button>
                )}
              </div>

              <div className="floatClear"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
