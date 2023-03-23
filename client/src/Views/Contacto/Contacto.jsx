import BreadCrump from "../../components/BreadCrump/BreadCrump";
import Meta from "../../components/Meta/Meta";
import styles from "./Contacto.module.css";

export default function Contacto() {
	return (
		<div>
			<Meta title={"Contacto"} />
			<BreadCrump title='Contacto' />
			<div class='container-xl text-center'>
				<div class='row align-items-center'>
					<div class='col-xs-12 col-sm-6'>One of three columns</div>
					<div class='col-xs-12 col-sm-6'>One of three columns</div>
				</div>
			</div>
		</div>
	);
}
