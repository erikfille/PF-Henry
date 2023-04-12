import { pets } from "../PetData/petHelp";
import PetData from "../PetData/PetData";
import { useEffect } from "react";
import { usePets } from "../../hooks/useStore";

const PetsContainer = (props) => {
  const { setPetDetailModal, setPetAddModal, pets } = props;

  useEffect(() => {}, []);

  return (
    <>
      {pets.length ? (
        pets.map((p) => (
          <PetData
            key={p.id}
            name={p.name}
            especie={p.especie}
            nac={p.nac}
            id={p.id}
            setPetDetailModal={setPetDetailModal}
          />
        ))
      ) : (
        <>
          <div>No hay mascotas para mostrar</div>
          <button onClick={() => setPetAddModal()}>Agregar una mascota</button>
        </>
      )}
    </>
  );
};

export default PetsContainer;
