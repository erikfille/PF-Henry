import style from "./PetData.module.css";
import { TbPawFilled } from "react-icons/tb";
import { usePets } from "../../hooks/useStore";
import EditPet from "../EditPet/EditPet";

const PetData = (props) => {
	const [setPetDetailModal, setPetEditModal, petEditModal] = usePets((state) => [
		state.setPetDetailModal,
		state.setPetEditModal,
    state.petEditModal
	]);

  const { id, name, especie, nac, imagen, historial, descripcion, origin } =
    props;

	return (
		<>
			<div className={`${style.pet} d-flex gap-80`}>
				<div className="d-none d-md-flex flex-column align-items-center gap-3">
					<div
						className={props.imagen ? style.imgMascota : style.circle}
						style={{ backgroundImage: `url(${props.imagen})` }}>
						{!props.imagen && <TbPawFilled style={{ width: "80px", height: "80px" }} />}
					</div>
					{
						props.origin !== "admin" ?
						<button className={style.info} onClick={() => setPetEditModal({
							id,
							name,
							especie,
							nac,
							imagen,
							historial,
							descripcion,
						})}>
							Editar
						</button>
						:
						null
					}

          	<EditPet />
				</div>
				<div className={style.detail}>
					<p className={`${style.name} mb-0`}>{props.name}</p>
					<p className={`${style.especie} mb-0`}>{props.especie}</p>
					<p className={`${style.nac} mb-0`}>{props.nac}</p>
					<button
						onClick={() =>
							setPetDetailModal({
								id,
								name,
								especie,
								nac,
								imagen,
								historial,
								descripcion,
							})
						}
						className={style.info}>
						+ Información
					</button>
				</div>
			</div>
		</>
	);
};

export default PetData;
