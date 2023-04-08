import { pets } from "../PetData/petHelp";
import PetData from "../PetData/PetData";

const PetsContainer = () => {
	return (
		<>
			{pets.map((p) => (
				<PetData
					key={`${p.name}-${p.nac}`}
					name={p.name}
					especie={p.especie}
					nac={p.nac}
				/>
			))}
		</>
	);
};

export default PetsContainer;
