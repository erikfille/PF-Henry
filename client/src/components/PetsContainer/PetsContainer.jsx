import { pets } from "../PetData/petHelp";
import PetData from "../PetData/PetData";
import { useEffect } from "react";

const PetsContainer = () => {

	
  useEffect(() => {}, []);

  return (
    <>
      {pets.map((p) => (
        <PetData
          key={p.id}
          name={p.name}
          especie={p.especie}
          nac={p.nac}
          id={p.id}
        />
      ))}
    </>
  );
};

export default PetsContainer;
