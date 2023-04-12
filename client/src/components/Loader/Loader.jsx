import style from "./Loader.module.css";
import logo from "../../images/logo-pet.png";

const Loader = () => {
	return (
		<>
			<div className={style.loader}>
				<img src={logo} alt="Dog Paw Icon" />
			</div>
		</>
	);
};

export default Loader;
