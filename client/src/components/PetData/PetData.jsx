import style from "./PetData.module.css";
import { TbPawFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const PetData = (props) => {
	return (
		<>
			<div className={`${style.pet} d-flex gap-80`}>
				<div className="d-none d-md-flex flex-column align-items-center gap-3">
					<div className={style.circle}>
						<TbPawFilled style={{ width: "80px", height: "80px" }} />
					</div>
					<button className={style.info}>Editar</button>
				</div>
				<div className={style.detail}>
					<p className={`${style.name} mb-0`}>{props.name}</p>
					<p className={`${style.especie} mb-0`}>{props.especie}</p>
					<p className={`${style.nac} mb-0`}>{props.nac}</p>
					<NavLink to="/pets" className={style.info}>
						+ Información
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default PetData;
