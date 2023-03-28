import { useState, useEffect } from "react";
import validation from "./validation";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import UploadWidget from "./UploadWidget";
import axios from "axios";

import Meta from "../Meta/Meta";
import BreadCrump from "../BreadCrump/BreadCrump";
import styles from "./CreateProducto.module.css"

export default function CreateProduct() {
  const [productData, setProductData] = useState({
    titulo: "",
    tipo: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
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

  async function getCategories() {
    let response = await axios.get("/categorias");
    console.log("categorias: ", response.data);
  }

  useEffect(() => {
    // Trae todas las categorias de producto desde el back y guarda las de productos y las de servicios
    getCategories();
  }, []);

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
      <BreadCrump title='Crear producto' />
        
      <div className={` home-wrapper-2 ${styles.creaateProductContainer}`}>
        <h1 className=' text-center fw-bold pt-5 pb-1'>
          ¡Registrá aquí tu producto o servicio y crece de la mano de PetsAmerica!
        </h1>
        
        <div className= "container-xl mt-5 bg-white py-4">
          <div className='row py-2'>
            <form onSubmit={handleSubmit} classname= "col-12 col-md-6 col-xxl-5 d-flex flex-column align-items-center ">
                <div className="mb-3  col-12 col-md-9">
                  
                  <div>
                    <label for='formGroupExampleInput' className='form-label fw-bold'>
									    Nombre del Producto/Servicio
								    </label>
                    <input 
                      type="text"
                      name="titulo"
                      value={productData.titulo}
                      onChange={handleInputChange}
                      className={`${errors.titulo ? "danger" : "formInput"} form-control`}
                      placeholder="Ingresa aquí el nombre de tu producto o servicio"
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
                    <label for='formGroupExampleInput' className='form-label fw-bold'>
									    Indicá si es un producto o servicio
								    </label>
                    <Select
                      name="tipo"
                      placeholder="Seleccioná producto o servicio"
                      className="basic-select"
                      options={[
                        { value: "tipo.a", label: "Producto" },
                        { value: "tipo.b", label: "Servicio" },
                      ]}
                      onChange={handleSelectChange}
                    />
                  </div>
                  
                  <br />
                    
                  <div>
                    <label for='formGroupExampleInput' className='form-label fw-bold'>
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
                      className={`${ errors.descripcion && errors.state ? "danger" : "formInput"} form-control `}
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
                    <label for='exampleFormControlTextarea1' class='form-label fw-bold'>
									    Precio
								    </label>
                    <input
                      placeholder="Precio"
                      type="number"
                      name="precio"
                      value={productData.precio}
                      onChange={handleInputChange}
                      className= "form-control"
                    />
                  </div>
                  
                  <br />

                  <div>
                    {productData.tipo === "Producto" ? (
                      <label for='exampleFormControlTextarea1' class='form-label fw-bold'>
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
                        className= "form-control"
                      />
                    ) : (
                    ""
                    )}
                  </div>
             
                  <br />

                  <div>
                    <label for='exampleFormControlTextarea1' class='form-label fw-bold'>
                      Seleccioná las categorías en las que querés que se publique tu 
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
                      className="basic-multi-select"
                      placeholder="Categorías"
                      onChange={handleSelectChange}
                    />
                  </div>      
            
                <br />
                </div>

                <div className="imgContainer ">
                  <div className="widgetButton">
                    <label for='exampleFormControlTextarea1' class='form-label fw-bold'>
                      Agregá una imagen de tu 
                    </label>
              
                    <UploadWidget onUpload={onUpload} />
                    <br />
                      {productData.imagen && (
                        <div className="uploadedImage">
                          <img src={productData.imagen} alt="Uploaded" width="30%" />
                        </div>
                      )}
                  </div>
                </div>

                <div>
                  {errors.state ? (
                    <button className="disabledButton" disabled>
                      <span>Crear </span>
                    </button>
                  ) : (
                    <button className="submitButton">
                      <span>Crear </span>
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
