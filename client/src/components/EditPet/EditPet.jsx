import { useState } from "react";
// import validation from "./validation";
import UploadWidget from "../UploadWidget/UploadWidget";
import { usePets, useModal } from "../../hooks/useStore";
import styles from "./EditPet.module.css";
import { useNavigate } from "react-router-dom";

export default function EditPet() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const [petEditModal, setPetEditModal, selectedPet, editPet, deletePet] =
    usePets((state) => [
      state.petEditModal,
      state.setPetEditModal,
      state.selectedPet,
      state.editPet,
      state.deletePet,
    ]);

  const [setModal, setModalInfo] = useModal((state) => [state.setModal, state.setModalInfo]);

  const [newPetData, setNewPetData] = useState({});

  const [errors, setErrors] = useState({
    nombre: "",
    especie: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    try {
      // await editPet(newPetData, selectedPet.id || selectedPet._id)
      setModalInfo("Mascota modificada", "Mascota modificada con exito!",editPet,[newPetData, selectedPet.id || selectedPet._id])
      setPetEditModal()
      navigate(`/perfil/${user.id}`)
    } catch (err) {
      window.alert(err.error);
    }
  }

  function handleInputChange(e) {
    setNewPetData({
      ...newPetData,
      [e.target.name]: e.target.value,
    });
  }

  function handleDate(e) {
    let date = e.target.value.split("-").reverse().join("-");
    setNewPetData({ ...newPetData, fechaDeNacimiento: date });
    // setErrors(
    //   validation({
    //     ...newPetData,
    //     [e.target.name]: date,
    //   })
    // );
  }

  function onUpload(url) {
    setNewPetData({ ...newPetData, imagen: url });
  }

	return (
		<div className={`container-l ${styles.modalContainer}`} style={{ display: petEditModal ? "block" : "none" }}>
      <div className={`home-wrapper-2 ${styles.createProductContainer} p-4 h-100`}>
        <div className="boton-close d-flex justify-content-end">
          <button onClick={() => setPetEditModal()} className={styles.buttonLink}>
            Cerrar
          </button>
        </div>
        <h1 className=" text-center fw-bold pt-5 pb-1">
          Modificar los datos de tu mascota
        </h1>
        <div className="container mt-5 py-4 d-flex justify-content-center mt-auto">
          <div className="row py-2">
            <form
              onSubmit={onSubmit}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              {/* <div className="mb-3 w-100">
                <div>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={newPetData.nombre}
                    onChange={handleInputChange}
                    className={`${errors.nombre && "is-invalid"} form-control`}
                    placeholder="Ingresa el nombre de tu mascota"
                  />
                  {errors.nombre && (
                    <span className={styles.errorSpan}>
                      {errors.nombre}
                      <br />
                    </span>
                  )}
                </div>
                <br />
                <div>
                  <label>Especie:</label>
                    <input
                  placeholder="Ej: Perro"
                  type="text"
                  name="especie"
                  value={newPetData.especie}
                  onChange={handleInputChange}
                  className={`${errors.especie && "is-invalid"} form-control`}
                />
                {errors.especie && (
                  <span className={styles.errorSpan}>
                    {errors.especie}
                    <br />
                  </span>
                )}
                <br />
                </div>
                <div>
                  <label>Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    name="fechaDeNacimiento"
                    onChange={handleDate}
                    className={`form-control`}
                    value={newPetData.fechaDeNacimiento}
                    required
                  />
                </div>
                <br />
                <div>
                  <label>Más información</label>
                  <textarea
                    placeholder="Cuentanos un poco de tu mascota"
                    type="text"
                    name="descripcion"
                    value={newPetData.descripcion}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <br />
              </div> */}
              <div className="imgContainer ">
                <div className="widgetButton text-center">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label fw-bold"
                  >
                    Agregá una imagen de tu mascota
                  </label>
                  <UploadWidget onUpload={onUpload} />
                  <br />
                  {newPetData.imagen && (
                    <div className="uploadedImage">
                      <img src={newPetData.imagen} alt="Uploaded" width="10%" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  className="button mt-3"
                  disabled={!Object.values(newPetData).length}>
                  Modificar Mascota
                </button>
              </div> 
              <div className="floatClear"></div>
            </form>
          </div>
        </div>
        <div className="d-flex justify-content-center">
                <button 
                  onClick={() => {setModal('Eliminar mascota', 'Estas seguro que deseas eliminar esta mascota?', deletePet, [selectedPet.id, user.id])}}
                  className="button"
                  style={{backgroundColor: "red"}}>
                  Eliminar mascota
                </button>
              </div>
      </div>
    </div>
  );
}
