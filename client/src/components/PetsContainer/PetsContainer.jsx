import PetData from "../PetData/PetData";
import { useEffect } from "react";
import { usePets } from "../../hooks/useStore";

const PetsContainer = (props) => {
  const { setPetDetailModal, setPetAddModal, pets } = props;

  // useEffect(() => {}, []);

  return (
    <>
      {typeof pets === "object" && pets.length ? (
        pets.map((p) => (
          <PetData
            key={p._id}
            id={p._id}
            name={p.nombre}
            especie={p.especie}
            nac={p.fechaDeNacimiento}
            imagen={p.imagen}
            historial={p.historial}
            descripcion={p.descripcion}
            setPetDetailModal={setPetDetailModal}
          />
        ))
      ) : (
        <>
          <div>No hay mascotas para mostrar</div>
          {/* <button onClick={() => setPetAddModal()}>Agregar una mascota</button> */}
        </>
      )}
    </>
  );
};

export default PetsContainer;
