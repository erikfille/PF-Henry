import { useEffect } from "react";
import PetData from "../PetData/PetData";

const PetsContainer = (props) => {
  const { setPetDetailModal, pets } = props;

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
            origin={props.origin}
          />
        ))
      ) : (
        <>
          <div>No hay mascotas para mostrar</div>
        </>
      )}
    </>
  );
};

export default PetsContainer;
