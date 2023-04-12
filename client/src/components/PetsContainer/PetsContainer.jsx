import { pets } from "../PetData/petHelp";
import PetData from "../PetData/PetData";
import { useEffect } from "react";
import { usePets } from "../../hooks/useStore";

const PetsContainer = (props) => {
  useEffect(() => {}, []);

  const [petAddModal] = usePets((state) => [state.petAddModal]);

  return (
    <>
      {props.pets.length ? (
        props.pets.map((p) => (
          <PetData
            key={p.id}
            name={p.name}
            especie={p.especie}
            nac={p.nac}
            id={p.id}
          />
        ))
      ) : (
        <>
          <div>No hay mascotas para mostrar</div>
          <button onClick={() => petAddModal()}>Agregar una mascota</button>
        </>
      )}
    </>
  );
};

export default PetsContainer;
